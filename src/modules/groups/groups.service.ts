import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
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

    findAll() {
        return `This action returns all groups`;
    }

    findOne(id: number) {
        return `This action returns a #${id} group`;
    }
    async remove(room_id: GroupAttributes["room_id"]) {
        await this.groupEntity.destroy({ where: { room_id } });
    }
}
