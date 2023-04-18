import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { hash } from "bcryptjs";
import { Op } from "sequelize";
import { CreateCredentialDto } from "./dto/create-credential.dto";
import { UpdateCredentialDto } from "./dto/update-credential.dto";
import { Credential } from "./entities/credential.entity";
import { CredentialAttributes } from "./interfaces/credential.interface";

@Injectable()
export class CredentialsService {
	constructor(
		@InjectModel(Credential)
		private readonly CredentailEntity: typeof Credential
	) {}
	async create(createCredentialDto: CreateCredentialDto) {
		const deplicateCredentails = await this.CredentailEntity.findAll({
			where: {
				[Op.or]: [
					{
						email: createCredentialDto.email,
					},
					{
						user_name: createCredentialDto.user_name,
					},
				],
			},
			limit: 2,
		});
		if (deplicateCredentails.length > 0) {
			const email: string = deplicateCredentails.filter(
				(val) => val.email == createCredentialDto.email
			)[0]?.email;
			const user_name = deplicateCredentails.filter(
				(val) => val.user_name == createCredentialDto.user_name
			)[0]?.user_name;
			throw new ConflictException(
				[
					email ? "email can't be used" : null,
					user_name ? "user_name can't be used" : null,
				],
				{
					description: "Forbidden",
				}
			);
		}
		try {
			const password = await hash(createCredentialDto.password, 12);
			let credential = await this.CredentailEntity.create({
				user_name: createCredentialDto.user_name,
				email: createCredentialDto.email,
				password,
			});
			return credential;
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	findAll() {
		return `This action returns all credentials`;
	}

	findOne(id: number) {
		return `This action returns a #${id} credential`;
	}

	update(id: number, updateCredentialDto: UpdateCredentialDto) {
		return `This action updates a #${id} credential`;
	}

	remove(id: CredentialAttributes["credential_id"]) {
		return this.CredentailEntity.destroy({ where: { credential_id: id } });
	}
}
