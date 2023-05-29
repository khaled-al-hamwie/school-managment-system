import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Student from "../entities/student.entity";
import { StudentAttributes } from "../interfaces/student.interface";
import { StudentsService } from "../students.service";

@Injectable()
export class StudentsBusesService {
    constructor(
        @InjectModel(Student) private readonly StudentEntity: typeof Student,
        private readonly studentsService: StudentsService
    ) {}
    async removeStudentBus(bus_id: StudentAttributes["bus_id"]) {
        await this.StudentEntity.update(
            { bus_id: null },
            { where: { bus_id } }
        );
    }
}
