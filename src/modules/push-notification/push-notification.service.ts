import { Inject, Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import * as service from "../../../fire.con.json";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { StudentsService } from "../students/students.service";
import { PushNotificationDto } from "./dto/push-notification.dto";

@Injectable()
export class PushNotificationService {
    constructor(private readonly studentsServices: StudentsService) {
        admin.initializeApp({
            credential: admin.credential.cert(service as ServiceAccount),
        });
    }
    async send(
        student_id: StudentAttributes["student_id"],
        dto: PushNotificationDto,
    ) {
        const student = await this.studentsServices.findOne({
            where: { student_id },
        });
        await admin.messaging().send({
            notification: { title: dto.title, body: dto.body },
            token: student.fbt,
        });
    }
}
