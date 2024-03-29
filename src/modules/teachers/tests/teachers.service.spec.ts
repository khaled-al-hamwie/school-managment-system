import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import cleanCredential from "src/core/database/database.cleanCredentail";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { TeachersService } from "../teachers.service";

describe("TeachersService", () => {
    let service: TeachersService;
    let body: CreateTeacherDto;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<TeachersService>(TeachersService);
        await cleanCredential();
    });

    beforeEach(() => {
        body = {
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
        };
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    it("should create", async () => {
        const output = await service.create(body);
        expect(output).toBe("done");
    });
    it("should update", async () => {
        body["first_name"] = "khaled al ha";
        const output = await service.update(
            (await service.findOne({ where: { salary: 100 } })).teacher_id,
            body,
        );
        expect(output).toBe("done");
    });
    it("should login ", async () => {
        const output = await service.login({
            user_name: body.user_name,
            password: body.password,
        });
        expect(output.access_token).not.toBeNull();
    });
});
