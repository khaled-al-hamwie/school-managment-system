import {
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/core/common/decorators/user.decorator";
import StudentGuard from "src/core/common/guards/student.guard";
import TeacherGuard from "src/core/common/guards/teacher.guard";
import { GROUP_TAG, PHONE_TAG } from "src/core/swagger/constants/swagger.tags";
import { StudentAttributes } from "../students/interfaces/student.interface";
import { StudentsService } from "../students/students.service";
import { GroupsService } from "./groups.service";
import { GroupAttributes } from "./interfaces/group.interface";

@ApiTags(GROUP_TAG, PHONE_TAG)
@Controller("groups")
export class GroupsController {
    constructor(
        private readonly groupsService: GroupsService,
        private readonly studentsService: StudentsService,
    ) {}

    @ApiBearerAuth("Authorization")
    @UseGuards(TeacherGuard)
    @Get("/teachers")
    findTeacherGroup() {
        return this.groupsService.findAll({});
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(StudentGuard)
    @Get("/student")
    async findStudentGroup(
        @User("student_id") student_id: StudentAttributes["student_id"],
    ) {
        const room_id = (
            await this.studentsService.findOne({ where: { student_id } })
        ).room_id;
        if (room_id == null)
            throw new NotFoundException(
                "you have not been assigned to a room yet",
            );
        return this.groupsService.findAll({ where: { room_id } });
    }

    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) group_id: GroupAttributes["group_id"],
    ) {
        const group = await this.groupsService.findOne({ where: { group_id } });
        if (!group) throw new NotFoundException("group don't exist ");
        return group;
    }
}
