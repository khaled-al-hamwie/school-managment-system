import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import Student from "src/modules/students/entities/student.entity";
import { Record } from "../entities/record.entity";
import { RecordsService } from "../records.service";

describe("RecordsService", () => {
    let service: RecordsService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<RecordsService>(RecordsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    it("findOne", async () => {
        await Record.create({
            class_id: 1,
            record_id: 1,
            student_id: 1,
            year: "2020/2021",
        });
        expect(
            await service.findOne({
                class_id: 1,
                record_id: 1,
                student_id: 1,
                year: "2020/2021",
            }),
        ).not.toBeNull();
        expect(
            await service.findOne({
                class_id: -1,
                record_id: 1,
                student_id: 1,
                year: "2020/2021",
            }),
        ).toBeNull();
    });

    it("record not exist", async () => {
        expect(await service.recordNotExist(-1, -1, "2020/2021")).toBeTruthy();
        expect(await service.recordNotExist(1, 1, "2020/2021")).toBeFalsy();
    });

    it("craete", async () => {
        await Student.create({
            student_id: 2,
            credential_id: 2,
            first_name: "khaled",
            last_name: "Teacher",
            birth_day: "2000-01-20",
            gender: "m",
            nationality: "UK",
            phone_number: "0963351256",
            location: "some where in UK",
            father_name: "fjdsalk",
            mother_name: "lfkdsa;",
        });
        await service.create(2, [1, 2, 2]);
        expect(
            await service.findOne({ class_id: 2, student_id: 1 }),
        ).toBeNull();
        expect(
            await service.findOne({ class_id: 2, student_id: 2 }),
        ).not.toBeNull();
        expect(
            (await Record.findAll({ where: { class_id: 2, student_id: 2 } }))
                .length,
        ).toBe(1);
    });

    afterAll(async () => {
        await Student.destroy({ where: {} });
        await Record.destroy({ where: {} });
    });
});
