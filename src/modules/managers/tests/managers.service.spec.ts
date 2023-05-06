import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import cleanCredential from "src/core/database/database.cleanCredentail";
import { setTimeout } from "timers/promises";
import { CreateManagerDto } from "../dto/create-manager.dto";
import { ManagersService } from "../managers.service";

describe("ManagersService", () => {
    let service: ManagersService;
    let body: CreateManagerDto;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<ManagersService>(ManagersService);
        await cleanCredential();
    });

    beforeEach(() => {
        body = {
            first_name: "fdsaf",
            middle_name: "fdsafdsa",
            last_name: "fdasfsadfdsa",
            phone_number: "fdsafdsafads",
            birth_day: new Date().toISOString(),
            gender: "f",
            nationality: "Uk",
            location: "ffasfdsafdsfdsa",
            salary: 100,
            email: "testma@test.com",
            password: "fdsfsadafsdfsad",
            user_name: "testma",
        };
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    it("should create", async () => {
        const output = await service.create(body);
        expect(output).toBe("done");
    });
    it("should find", async () => {
        await setTimeout(1000);
        const output = await service.findOne({ middle_name: "fdsafdsa" });
        expect(output).not.toBeNull();
    });
    it("should update", async () => {
        body["first_name"] = "khaled al ha";
        const output = await service.update(
            (
                await service.findOne({ salary: 100 })
            ).manager_id,
            body
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
