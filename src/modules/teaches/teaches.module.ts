import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TeachersModule } from "../teachers/teachers.module";
import { Teach } from "./entities/teach.entity";
import { TeachesService } from "./teaches.service";

@Module({
    imports: [SequelizeModule.forFeature([Teach]), TeachersModule],
    providers: [TeachesService],
    exports: [TeachesService],
})
export class TeachesModule {}
