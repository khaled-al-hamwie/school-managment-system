import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { SchedulesService } from "../schedules.service";

describe("SchedulesService", () => {
    let service: SchedulesService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<SchedulesService>(SchedulesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create a schedule", async () => {
        await service.create(12, "room 1", {
            days: ["fri", "sat"],
            lecture_number: 6,
            school_start: "07:30",
            rests: [1, 3],
        });
    });
});
