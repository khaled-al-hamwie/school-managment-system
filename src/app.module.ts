import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { databaseProvider } from "./core/database/database.providers";
import { BooksModule } from "./modules/books/books.module";
import { ClassesModule } from "./modules/classes/classes.module";
import { LecturesModule } from "./modules/lectures/lectures.module";
import { ManagersModule } from "./modules/managers/managers.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { StudentsModule } from "./modules/students/students.module";
import { SubjectsModule } from "./modules/subjects/subjects.module";
import { TeachersModule } from "./modules/teachers/teachers.module";
import { TeachesModule } from "./modules/teaches/teaches.module";
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ScheduleDaysModule } from './modules/schedule_days/schedule_days.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CacheModule.register({ ttl: 60, max: 1000, isGlobal: true }),
        EventEmitterModule.forRoot(),
        databaseProvider,
        ManagersModule,
        TeachersModule,
        StudentsModule,
        ClassesModule,
        RoomsModule,
        SubjectsModule,
        BooksModule,
        TeachesModule,
        LecturesModule,
        SchedulesModule,
        ScheduleDaysModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {}
