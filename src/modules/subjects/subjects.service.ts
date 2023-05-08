import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";
import whereWrapperTransform from "src/core/common/transformers/whereWrapper.transform";
import { ClassesService } from "../classes/classes.service";
import { Class } from "../classes/entities/class.entity";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { FindAllSubjectDto } from "./dto/findAll-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Subject } from "./entities/subject.entity";
import { SubjectAttributes } from "./interfaces/subject.interface";

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

    findAll(query: FindAllSubjectDto, page = 0) {
        const whereOptions: WhereOptions<SubjectAttributes> =
            whereWrapperTransform(query);

        return this.SubjectEntity.findAll({
            where: whereOptions,
            include: {
                model: Class,
            },
            offset: page * 5,
            limit: 5,
            order: [["name", "ASC"]],
        });
    }

    // TO-DO add the book of the subject , and teacher
    findOne(options: WhereOptions<SubjectAttributes>) {
        return this.SubjectEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    async update(
        subject_id: SubjectAttributes["subject_id"],
        updateSubjectDto: UpdateSubjectDto
    ) {
        const { class_id } = updateSubjectDto;
        const subject = await this.findOne({ subject_id });
        if (!subject) throw new NotFoundException("subject doesn't exists");
        if (
            class_id &&
            !(await this.classesService.findOne({
                class_id,
            }))
        ) {
            throw new NotFoundException(
                `class with id=${class_id} does'nt exists`
            );
        }
        subject.update(updateSubjectDto).then((output) => output.save());
        return "done";
    }

    remove(subject_id: SubjectAttributes["subject_id"]) {
        this.SubjectEntity.destroy({ where: { subject_id } });
        return "done";
    }
}
