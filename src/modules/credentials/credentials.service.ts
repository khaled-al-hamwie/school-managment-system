import {
    ConflictException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { compare, hash } from "bcryptjs";
import { WhereOptions } from "sequelize";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { UpdateCredentialDto } from "./dto/update-credential.dto";
import { Credential } from "./entities/credential.entity";
import { CredentialAttributes } from "./interfaces/credential.interface";

@Injectable()
export class CredentialsService {
    constructor(
        @InjectModel(Credential)
        private readonly CredentailEntity: typeof Credential,
    ) {}
    async create(createCredentialDto: CreateCredentialDto) {
        const deplicateCredentails = await this.findOne({
            user_name: createCredentialDto.user_name,
        });
        if (deplicateCredentails) {
            throw new ConflictException(["user_name can't be used"], {
                description: "Forbidden",
            });
        }
        try {
            const password = await hash(createCredentialDto.password, 12);
            const credential = await this.CredentailEntity.create({
                user_name: createCredentialDto.user_name,
                email: createCredentialDto.email,
                password,
            });
            return credential;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async verify(body: CreateAuthDto) {
        const credential = await this.findOne({ user_name: body.user_name });
        if (!credential)
            throw new ForbiddenException("credentials don't match", {
                description: "Forbidden",
            });
        const hashed = await compare(body.password, credential.password);
        if (!hashed)
            throw new ForbiddenException("credentials don't match", {
                description: "Forbidden",
            });
        return credential;
    }

    async findOne(options: WhereOptions<CredentialAttributes>) {
        return this.CredentailEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    async update(
        credential_id: CredentialAttributes["credential_id"],
        password: UpdateCredentialDto["password"],
    ) {
        return (await this.findOne({ credential_id }))
            .set("password", await hash(password, 12))
            .save();
    }

    remove(credential_id: CredentialAttributes["credential_id"]) {
        return this.CredentailEntity.destroy({ where: { credential_id } });
    }
}
