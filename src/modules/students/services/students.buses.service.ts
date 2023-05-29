import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { successRes } from "src/core/common/responses/success.response";
import { BusAttributes } from "src/modules/buses/interfaces/bus.interface";
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

    async subscribe(
        student_id: StudentAttributes["student_id"],
        bus_id: BusAttributes["bus_id"]
    ) {
        const student = await this.studentsService.findOne({
            where: { student_id },
        });
        if (student.bus_id) {
            throw new BadRequestException(
                "you are subscribed to another bus pleas unsubscribe from it first"
            );
        }
        student.update({ bus_id });
        return successRes;
    }

    async unsubscribe(student_id: StudentAttributes["student_id"]) {
        const student = await this.checkBusSubscribtion(student_id);
        student.update({ bus_id: null });
        return successRes;
    }

    async checkBusSubscribtion(student_id: number) {
        const student = await this.studentsService.findOne({
            where: { student_id },
        });
        if (!student.bus_id) {
            throw new BadRequestException("you have no bus subscribtion");
        }
        return student;
    }
}
