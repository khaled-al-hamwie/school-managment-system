import { Injectable } from "@nestjs/common";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";

@Injectable()
export class HomeworkSubmissionsService {
    create(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
        return "This action adds a new homeworkSubmission";
    }

    findAll() {
        return `This action returns all homeworkSubmissions`;
    }

    findOne(id: number) {
        return `This action returns a #${id} homeworkSubmission`;
    }
}
