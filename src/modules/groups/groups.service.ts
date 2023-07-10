import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { Group } from "./entities/group.entity";
import { GroupAttributes } from "./interfaces/group.interface";

@Injectable()
export class GroupsService {
    constructor(
        @InjectModel(Group) private readonly groupEntity: typeof Group
    ) {}
    create(group: GroupAttributes) {
        return this.groupEntity.create(group);
    }

    async findAll(options: FindOptions<GroupAttributes>) {
        return this.groupEntity.findAll(options);
    }

    async findOne(options: FindOptions<GroupAttributes>) {
        return this.groupEntity.findOne({
            ...options,
        });
    }
    async remove(room_id: GroupAttributes["room_id"]) {
        await this.groupEntity.destroy({ where: { room_id } });
    }
}
