import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
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
            lecture_number: 6,
            start_time: "07:30",
            schedule_id: 1,
            rests: [1, 3],
        });
    });
});
