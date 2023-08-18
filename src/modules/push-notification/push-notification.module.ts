import { Module } from "@nestjs/common";
import { StudentsModule } from "../students/students.module";
import { PushNotificationService } from "./push-notification.service";

@Module({
    imports: [StudentsModule],
    providers: [PushNotificationService],
    exports: [PushNotificationService],
})
export class PushNotificationModule {}
