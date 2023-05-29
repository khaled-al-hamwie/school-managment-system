import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions, WhereOptions } from "sequelize";
import removeCredentails from "src/core/common/transformers/removeCredentails.transform";
import whereWrapperTransform from "src/core/common/transformers/whereWrapper.transform";
import { AuthService } from "../auth/auth.service";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CredentialsService } from "../credentials/credentials.service";
import { Credential } from "../credentials/entities/credential.entity";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { FindAllTeacherDto } from "./dto/findAll-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import Teacher from "./entities/teacher.entity";
import { TeacherAttributes } from "./interfaces/teacher.interface";

@Injectable()
export class TeachersService {
    constructor(
        @InjectModel(Teacher) private readonly TeacherEntity: typeof Teacher,
        private readonly credentailsService: CredentialsService,
        private readonly authService: AuthService
    ) {}
    async create(createTeacherDto: CreateTeacherDto) {
        const credentail = await this.credentailsService.create({
            email: createTeacherDto.email,
            user_name: createTeacherDto.user_name,
            password: createTeacherDto.password,
        });
        removeCredentails(createTeacherDto);
        this.TeacherEntity.create({
            credential_id: credentail.credential_id,
            ...createTeacherDto,
        });
        return "done";
    }

    async login(body: CreateAuthDto) {
        const credentail = await this.credentailsService.verify(body);
        const teacher = await this.findOne({
            where: { credential_id: credentail.credential_id },
        });
        if (!teacher) {
            throw new ForbiddenException("credentials don't match", {
                description: "Forbidden",
            });
        }
        return this.authService.signToken({
            credentail_id: credentail.credential_id,
            teacher_id: teacher.teacher_id,
            user_name: credentail.user_name,
        });
    }

    findAll(query: FindAllTeacherDto, page = 0) {
        const whereOptions: WhereOptions<TeacherAttributes> =
            whereWrapperTransform(query);
        return this.TeacherEntity.findAll({
            where: whereOptions,
            attributes: { exclude: ["credential_id"] },
            include: {
                model: Credential,
                attributes: { exclude: ["password"] },
            },
            offset: page * 5,
            limit: 5,
            order: [["first_name", "ASC"]],
        });
    }

    async findOne(options: FindOptions<TeacherAttributes>) {
        return this.TeacherEntity.findOne(options);
    }

    async update(
        teacher_id: TeacherAttributes["teacher_id"],
        updateTeacherDto: UpdateTeacherDto
    ) {
        const teacher = await this.findOne({ where: { teacher_id } });
        if (!teacher) throw new NotFoundException("teacher dosen't exists");
        teacher.update(updateTeacherDto).then((output) => output.save());
        if (updateTeacherDto.password)
            this.credentailsService.update(
                teacher.credential_id,
                updateTeacherDto.password
            );
        return "done";
    }
}
