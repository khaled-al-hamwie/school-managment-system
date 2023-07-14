import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Subject } from "src/modules/subjects/entities/subject.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";
import { setTimeout } from "timers/promises";
import { Teach } from "../entities/teach.entity";
import { TeachesService } from "../teaches.service";

describe("TeachesService", () => {
    let service: TeachesService;
    let subject_id1: number;
    let teacher_id1: number;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<TeachesService>(TeachesService);

        await Subject.create({
            subject_id: 1,
            class_id: 1,
            name: "hjk",
            semester: 1,
        });
        await Teacher.create({
            first_name: "fdsaf",
            middle_name: "fdsafdsa",
            last_name: "fdasfsadfdsa",
            phone_number: "fdsafdsafads",
            location: "ffasfdsafdsfdsa",
            salary: 100,
            birth_day: new Date(),
            gender: "f",
            credential_id: 1,
            teacher_id: 1,
        });
        subject_id1 = 1;
        teacher_id1 = 1;
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create", async () => {
        await service.create(subject_id1, [teacher_id1]);
    });
    it("should find", async () => {
        await setTimeout(1000);
        const teach = await service.findOne({ subject_id: subject_id1 });
        expect(teach.subject_id).toBe(subject_id1);
    });
    it("should not exist", async () => {
        const teach = await service.teachNotExist(
            subject_id1 + 345,
            teacher_id1,
        );
        expect(teach).toBeTruthy();
    });
    it("should not allow non existing taecher", async () => {
        await service.create(subject_id1, [0]);
        await setTimeout(1000);
        expect(await service.teachNotExist(subject_id1, 0)).toBeTruthy();
    });
    it("check teach", async () => {
        try {
            await service.checkTeach(-1);
        } catch (error) {
            expect(error.name).toBe("NotFoundException");
        }
    });

    afterAll(async () => {
        await Subject.destroy({ where: {} });
        await Teacher.destroy({ where: {} });
        await Teach.destroy({ where: {} });
    });
});
