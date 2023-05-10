import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import cleanCredential from "src/core/database/database.cleanCredentail";
import { SubjectsService } from "src/modules/subjects/subjects.service";
import { TeachersService } from "src/modules/teachers/teachers.service";
import { setTimeout } from "timers/promises";
import { Teach } from "../entities/teach.entity";
import { TeachesService } from "../teaches.service";

describe("TeachesService", () => {
    let service: TeachesService;
    let teachersService: TeachersService;
    let subjectsService: SubjectsService;
    let subject_id1: number;
    let teacher_id1: number;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<TeachesService>(TeachesService);
        teachersService = module.get<TeachersService>(TeachersService);
        subjectsService = module.get<SubjectsService>(SubjectsService);
        await cleanCredential();
        await subjectsService.create({
            class_id: 1,
            name: "hjk",
            semester: 1,
        });
        await teachersService.create({
            first_name: "fdsaf",
            middle_name: "fdsafdsa",
            last_name: "fdasfsadfdsa",
            phone_number: "fdsafdsafads",
            location: "ffasfdsafdsfdsa",
            salary: 100,
            email: "testma@test.com",
            password: "fdsfsadafsdfsad",
            user_name: "testma",
            birth_day: new Date(),
            gender: "f",
        });
        subject_id1 = (await subjectsService.findAll(null))[0].subject_id;
        teacher_id1 = (await teachersService.findAll(null))[0].teacher_id;
        await Teach.destroy({ where: {} });
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        expect(teachersService).toBeDefined();
        expect(subjectsService).toBeDefined();
    });

    it("should create", async () => {
        await service.create(subject_id1, [teacher_id1]);
    });
    it("should find", async () => {
        await setTimeout(1000);
        let teach = await service.findOne({ subject_id: subject_id1 });
        expect(teach.subject_id).toBe(subject_id1);
    });
    it("should not exist", async () => {
        const teach = await service.teachNotExist(
            subject_id1 + 345,
            teacher_id1
        );
        expect(teach).toBeTruthy();
    });
    it("should not allow non existing taecher", async () => {
        await service.create(subject_id1, [0]);
        await setTimeout(1000);
        expect(await service.teachNotExist(subject_id1, 0)).toBeTruthy();
    });
});
