import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { databaseProvider } from "./core/database/database.providers";
import { ClassesModule } from "./modules/classes/classes.module";
import { ManagersModule } from "./modules/managers/managers.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { StudentsModule } from "./modules/students/students.module";
import { SubjectsModule } from "./modules/subjects/subjects.module";
import { TeachersModule } from "./modules/teachers/teachers.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CacheModule.register({ ttl: 60, max: 1000, isGlobal: true }),
        databaseProvider,
        ManagersModule,
        TeachersModule,
        StudentsModule,
        ClassesModule,
        RoomsModule,
        SubjectsModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {}
