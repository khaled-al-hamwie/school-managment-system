import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./entities/group.entity";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";

@Module({
    imports: [SequelizeModule.forFeature([Group])],
    controllers: [GroupsController],
    providers: [GroupsService],
})
export class GroupsModule {}
