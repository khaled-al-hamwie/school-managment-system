import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudentsModule } from "../students/students.module";
import { Group } from "./entities/group.entity";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";

@Module({
    imports: [SequelizeModule.forFeature([Group]), StudentsModule],
    controllers: [GroupsController],
    providers: [GroupsService],
    exports: [GroupsService],
})
export class GroupsModule {}
