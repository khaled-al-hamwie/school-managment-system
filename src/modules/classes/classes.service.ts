import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, WhereOptions } from "sequelize";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { Class } from "./entities/class.entity";
import { ClassAttributes } from "./interfaces/class.interface";

@Injectable()
export class ClassesService {
    constructor(
        @InjectModel(Class) private readonly ClassEntity: typeof Class
    ) {}
    create(createClassDto: CreateClassDto) {
        this.ClassEntity.create(createClassDto);
        return "done";
    }

    findAll(name: string | undefined) {
        let WhereOptions = {};
        if (name) {
            WhereOptions = {
                name: {
                    [Op.regexp]: name,
                },
            };
        }
        return this.ClassEntity.findAll({
            where: WhereOptions,
        });
    }

    async findOne(options: WhereOptions<ClassAttributes>) {
        return this.ClassEntity.findOne({
            where: options,
            limit: 1,
        });
    }

    async update(
        class_id: ClassAttributes["class_id"],
        updateClassDto: UpdateClassDto
    ) {
        const myClass = await this.checkClass(class_id);
        myClass.update(updateClassDto).then((output) => output.save());
        return "done";
    }

    remove(class_id: ClassAttributes["class_id"]) {
        this.ClassEntity.destroy({ where: { class_id } });
        return "done";
    }

    async checkClass(class_id: ClassAttributes["class_id"]) {
        const myClass = await this.findOne({
            class_id,
        });
        if (!myClass) throw new NotFoundException("class doesn't exists");
        return myClass;
    }
}
