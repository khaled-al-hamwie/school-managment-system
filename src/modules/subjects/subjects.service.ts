import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ClassesService } from "../classes/classes.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Subject } from "./entities/subject.entity";

@Injectable()
export class SubjectsService {
    constructor(
        @InjectModel(Subject) private readonly SubjectEntity: typeof Subject,
        private readonly classesService: ClassesService
    ) {}
    async create(createSubjectDto: CreateSubjectDto) {
        const myClass = await this.classesService.findOne({
            class_id: createSubjectDto.class_id,
        });
        if (!myClass) {
            throw new NotFoundException("class doesn't exists");
        }
        this.SubjectEntity.create(createSubjectDto);
        return "done";
    }

    findAll() {
        return `This action returns all subjects`;
    }

    findOne(id: number) {
        return `This action returns a #${id} subject`;
    }

    update(id: number, updateSubjectDto: UpdateSubjectDto) {
        return `This action updates a #${id} subject`;
    }

    remove(id: number) {
        return `This action removes a #${id} subject`;
    }
}
