import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { Class } from "./entities/class.entity";

@Injectable()
export class ClassesService {
    constructor(
        @InjectModel(Class) private readonly ClassEntity: typeof Class
    ) {}
    create(createClassDto: CreateClassDto) {
        this.ClassEntity.create(createClassDto);
        return "done";
    }

    findAll() {
        return `This action returns all classes`;
    }

    update(id: number, updateClassDto: UpdateClassDto) {
        return `This action updates a #${id} class`;
    }

    remove(id: number) {
        return `This action removes a #${id} class`;
    }
}
