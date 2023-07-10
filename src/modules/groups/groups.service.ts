import { Injectable } from "@nestjs/common";
import { GroupAttributes } from "./interfaces/group.interface";

@Injectable()
export class GroupsService {
    create(group: GroupAttributes) {
        return "This action adds a new group";
    }

    findAll() {
        return `This action returns all groups`;
    }

    findOne(id: number) {
        return `This action returns a #${id} group`;
    }
}
