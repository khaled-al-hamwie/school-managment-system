import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { setTimeout } from "timers/promises";
import { ClassesService } from "../classes.service";
import { CreateClassDto } from "../dto/create-class.dto";
import { bodySample } from "./sample";

describe("ClassesService", () => {
    let service: ClassesService;
    let body: CreateClassDto;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<ClassesService>(ClassesService);
    });
    beforeEach(() => {
        body = bodySample;
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create a class", () => {
        const output = service.create(body);
        expect(output).toBe("done");
    });
    it("should find", async () => {
        await setTimeout(1000);
        const output = await service.findOne({ name: body.name });
        expect(output).not.toBeNull();
    });
    it("should update", async () => {
        const myClass_id = (await service.findOne({ name: body.name }))
            .class_id;
        const output = await service.update(myClass_id, {
            name: "fjds;lak;jfdsalk",
        });
        expect(output).toBe("done");
    });
    it("should remove", async () => {
        const myClass_id = (await service.findOne({ name: "fjds;lak;jfdsalk" }))
            .class_id;
        const output = service.remove(myClass_id);
        expect(output).toBe("done");
    });
});
