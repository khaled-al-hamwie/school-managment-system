import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreateLectureDto } from "../dto/create-lecture.dto";
import { UpdateLecturesDto } from "../dto/update-lectures.dto";
import { Lecture } from "../entities/lecture.entity";
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
        await service.create(body);
    });
    it("should create lectures", async () => {
        await service.addLectures("07:30", 6, 1, [1, 3]);
    });

    it("should update a lecture", async () => {
        const lec = await Lecture.create({
            schedule_day_id: 1,
            start_time: "02:30",
        });
        try {
            await service.update(lec, { is_rest: true, lecture_number: 10 });
        } catch (error) {
            expect(error).toBeNull();
        }
    });

    it("should update lectures", async () => {
        const body: UpdateLecturesDto = {
            schedule_day_id: 1,
            lectures: [
                {
                    teach_id: 0,
                    lecture_number: 4,
                },
            ],
        };
        await Lecture.create({
            schedule_day_id: 1,
            lecture_number: 4,
            start_time: "04:30",
            teach_id: 2,
        });
        try {
            await service.updateLectures(body);
        } catch (error) {
            expect(error).toBeNull();
        }
    });
    // afterAll(async () => {
    //     await Lecture.destroy({ where: {} });
    // });
});
