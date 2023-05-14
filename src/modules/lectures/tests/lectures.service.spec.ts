import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreateLectureDto } from "../dto/create-lecture.dto";
import { LecturesService } from "../lectures.service";

describe("LecturesService", () => {
    let service: LecturesService;
    let body: CreateLectureDto;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<LecturesService>(LecturesService);
        body = {
            start_time: "12:30",
            schedule_day_id: 1,
        };
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    it("should create", async () => {
        const output = await service.create(body);
        // expect(output).not.toThrowError();
    });
});
