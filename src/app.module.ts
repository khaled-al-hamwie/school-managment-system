import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { databaseProvider } from "./core/database/database.providers";
import { BooksModule } from "./modules/books/books.module";
import { BusesModule } from "./modules/buses/buses.module";
import { ClassesModule } from "./modules/classes/classes.module";
import { GroupsModule } from "./modules/groups/groups.module";
import { ManagersModule } from "./modules/managers/managers.module";
import { RecordsModule } from "./modules/records/records.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { SchedulesModule } from "./modules/schedules/schedules.module";
import { StudentsModule } from "./modules/students/students.module";
import { SubjectsModule } from "./modules/subjects/subjects.module";
import { TeachersModule } from "./modules/teachers/teachers.module";
import { TeachesModule } from "./modules/teaches/teaches.module";
// import { AppGateway } from './app/app.gateway';
import { ChatGateway } from "./core/getway/chat.gateway";
import { GetewayModule } from "./core/getway/geteway.module";
import { MessagesModule } from "./modules/messages/messages.module";

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
        SchedulesModule,
        RecordsModule,
        BusesModule,
        GroupsModule,
        MessagesModule,
        GetewayModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
        // AppGateway,
    ],
})
export class AppModule {}
