import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { setTimeout } from "timers/promises";
import { CreateSubjectDto } from "../dto/create-subject.dto";
import { SubjectsService } from "../subjects.service";

describe("subject Service", () => {
    let service: SubjectsService;
    let body: CreateSubjectDto;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<SubjectsService>(SubjectsService);

        body = {
            class_id: 1,
            name: "math",
            semester: 1,
        };
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create a subject", async () => {
        const output = await service.create(body);
        expect(output).toBe("done");
    });
    it("should find", async () => {
        await setTimeout(1000);
        const output = await service.findOne({ name: body.name });
        expect(output).not.toBeNull();
    });
    it("should update", async () => {
        const subject = (await service.findOne({ name: body.name })).subject_id;
        const output = await service.update(subject, {
            name: "fjds;lak;jfdsalk",
        });
        expect(output).toBe("done");
    });
    it("should remove", async () => {
        const subject = (await service.findOne({ name: "fjds;lak;jfdsalk" }))
            .subject_id;
        const output = await service.remove(subject);
        expect(output).toBe("done");
    });
});
