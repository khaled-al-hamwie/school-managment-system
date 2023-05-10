import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Cache } from "cache-manager";
import { WhereOptions } from "sequelize";
import whereWrapperTransform from "src/core/common/transformers/whereWrapper.transform";
import { ClassesService } from "../classes/classes.service";
import { Class } from "../classes/entities/class.entity";
import { TeachesService } from "../teaches/teaches.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { FindAllSubjectDto } from "./dto/findAll-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Subject } from "./entities/subject.entity";
import { SubjectAttributes } from "./interfaces/subject.interface";

@Injectable()
export class SubjectsService {
    constructor(
        @InjectModel(Subject) private readonly SubjectEntity: typeof Subject,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly classesService: ClassesService,
        private readonly TeachesService: TeachesService
    ) {}
    async create(createSubjectDto: CreateSubjectDto) {
        const classExist = await this.cacheManager.get(
            `class:${createSubjectDto.class_id}:exist`
        );
        if (!classExist) {
            await this.classesService.checkClass(createSubjectDto.class_id);
            await this.cacheManager.set(
                `class:${createSubjectDto.class_id}:exist`,
                true,
                10 * 60 * 60 * 60
            );
        }
        const subject = await this.SubjectEntity.create(createSubjectDto);
        if (createSubjectDto.teacher_ids) {
            this.TeachesService.create(
                subject.subject_id,
                createSubjectDto.teacher_ids
            );
        }
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
        const { class_id, teacher_ids } = updateSubjectDto;
        const subject = await this.findOne({ subject_id });
        if (!subject) throw new NotFoundException("subject doesn't exists");
        if (class_id) {
            await this.classesService.checkClass(updateSubjectDto.class_id);
        }

        subject.update(updateSubjectDto).then((output) => output.save());
        if (teacher_ids) {
            this.TeachesService.create(subject_id, teacher_ids);
        }
        return "done";
    }

    remove(subject_id: SubjectAttributes["subject_id"]) {
        this.SubjectEntity.destroy({ where: { subject_id } });
        return "done";
    }
}
