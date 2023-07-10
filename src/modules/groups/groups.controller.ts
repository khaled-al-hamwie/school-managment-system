import { Controller, Get, Param } from "@nestjs/common";
import { GroupsService } from "./groups.service";

@Controller("groups")
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {}

    @Get()
    findAll() {
        return this.groupsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.groupsService.findOne(+id);
    }
}
