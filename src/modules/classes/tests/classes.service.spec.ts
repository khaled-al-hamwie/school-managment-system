import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
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
        expect("hi").toBe("hi");
    });

    it("should create a class", () => {
        const output = service.create(body);
        expect(output).toBe("done");
    });
});
