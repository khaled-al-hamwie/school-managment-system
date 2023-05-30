import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Lecture } from "src/modules/lectures/entities/lecture.entity";
import { Teach } from "src/modules/teaches/entities/teach.entity";
import { ScheduleDay } from "../entities/schedule_day.entity";
import { ScheduleDaysService } from "../schedule_days.service";

describe("ScheduleDaysService", () => {
    let service: ScheduleDaysService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<ScheduleDaysService>(ScheduleDaysService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create a schedule day", async () => {
        await service.create({
            days: ["sat", "sun", "mon", "tue"],
            lecture_number: 2,
            start_time: "07:30",
            schedule_id: 1,
            rests: [1, 3],
        });
    });

    it("check teacher teach on same day", async () => {
        try {
            await service.checkTeacherTeachOnSameDay(
                "sat",
                {
                    lecture_number: 1,
                    teach_id: 1,
                },
                []
            );
        } catch (error) {
            expect(error.name).toBe("NotFoundException");
        }
        await Teach.create({ subject_id: 1, teach_id: 12, teacher_id: 1 });
        await Teach.create({ subject_id: 1, teach_id: 13, teacher_id: 1 });
        await ScheduleDay.create({
            day: "sat",
            lecture_number: 4,
            schedule_day_id: 45,
            schedule_id: 1,
            start_time: "00:00:11",
        });
        await Lecture.create({
            schedule_day_id: 45,
            teach_id: 13,
            lecture_number: 1,
            start_time: "07:30:00",
        });
        await service.checkTeacherTeachOnSameDay(
            "sat",
            {
                lecture_number: 1,
                teach_id: 12,
            },
            []
        );
    });

    it("should destroy", async () => {
        await ScheduleDay.create({
            day: "sat",
            lecture_number: 4,
            schedule_id: 3,
            start_time: "00:00:11",
        });
        await service.remove(3);
    });
    afterAll(async () => {
        await Lecture.destroy({ where: {} });
        await Teach.destroy({ where: {} });
        await Lecture.destroy({ where: {} });
        await ScheduleDay.destroy({ where: {} });
    });
});
