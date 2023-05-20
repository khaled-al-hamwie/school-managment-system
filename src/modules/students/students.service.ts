import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import removeCredentails from "src/core/common/transformers/removeCredentails.transform";
import whereWrapperTransform from "src/core/common/transformers/whereWrapper.transform";
import { AuthService } from "../auth/auth.service";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CredentialsService } from "../credentials/credentials.service";
import { Credential } from "../credentials/entities/credential.entity";
import { CreateStudentDto } from "./dto/create-student.dto";
import { FindAllStudentDto } from "./dto/findAll-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import Student from "./entities/student.entity";
import { StudentAttributes } from "./interfaces/student.interface";

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student) private readonly StudentEntity: typeof Student,
        private readonly credentailsService: CredentialsService,
        private readonly authService: AuthService
    ) {}

    async create(createStudentDto: CreateStudentDto) {
        const credentail = await this.credentailsService.create({
            email: createStudentDto.email,
            user_name: createStudentDto.user_name,
            password: createStudentDto.password,
        });
        removeCredentails(createStudentDto);
        this.StudentEntity.create({
            credential_id: credentail.credential_id,
            ...createStudentDto,
        });
        return "done";
    }

    async login(body: CreateAuthDto) {
        const credentail = await this.credentailsService.verify(body);
        const student = await this.findOne({
            credential_id: credentail.credential_id,
        });
        if (!student)
            throw new ForbiddenException("credentials don't match", {
                description: "Forbidden",
            });

        return this.authService.signToken({
            credentail_id: credentail.credential_id,
            student_id: student.student_id,
            user_name: credentail.user_name,
        });
    }

    findAll(query: FindAllStudentDto, page = 0) {
        const whereOptions: WhereOptions<StudentAttributes> =
            whereWrapperTransform(query);
        return this.StudentEntity.findAll({
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

    async findOne(options: WhereOptions<StudentAttributes>) {
        return this.StudentEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    async update(
        student_id: StudentAttributes["student_id"],
        updateStudentDto: UpdateStudentDto
    ) {
        const student = await this.findOne({ student_id });
        if (!student) throw new NotFoundException("student dosen't exists");
        student.update(updateStudentDto).then((output) => output.save());
        if (updateStudentDto.password)
            this.credentailsService.update(
                student.credential_id,
                updateStudentDto.password
            );
        return "done";
    }

    async addRooms(
        room_id: StudentAttributes["room_id"],
        student_ids: StudentAttributes["student_id"][]
    ) {
        for (let i = 0; i < student_ids.length; i++) {
            const student_id = student_ids[i];
            await this.StudentEntity.update(
                { room_id },
                { where: { student_id } }
            );
        }
    }
}
