import { Injectable } from "@nestjs/common";
import { CreateExamDto } from "./dto/create-exam.dto";

@Injectable()
export class ExamsService {
    create(createExamDto: CreateExamDto) {
        return "This action adds a new exam";
    }

    findAll() {
        return `This action returns all exams`;
    }
}
