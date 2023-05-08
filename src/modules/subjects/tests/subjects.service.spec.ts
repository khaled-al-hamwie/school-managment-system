import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { ClassesModule } from "src/modules/classes/classes.module";
import { ClassesService } from "src/modules/classes/classes.service";
import { bodySample } from "src/modules/classes/tests/sample";
import { setTimeout } from "timers/promises";
import { CreateSubjectDto } from "../dto/create-subject.dto";
import { SubjectsService } from "../subjects.service";

describe("ClassesService", () => {
    let service: SubjectsService;
    let classesService: ClassesService;
    let body: CreateSubjectDto;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<SubjectsService>(SubjectsService);
        classesService = module.get<ClassesService>(ClassesService);
        classesService.create(bodySample);
        console.info((await classesService.findAll(""))[0].class_id);
        body = {
            class_id: (await classesService.findAll(""))[0].class_id,
            name: "math",
            semester: 1,
        };
        console.info(body);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
        expect(classesService).toBeDefined();
    });

    it("should create a class", () => {
        const output = service.create(body);
        expect(output).toBe("done");
    });
    // it("should find", async () => {
    //     await setTimeout(1000);
    //     const output = await service.findOne({ name: body.name });
    //     expect(output).not.toBeNull();
    // });
    // it("should update", async () => {
    //     const myClass_id = (await service.findOne({ name: body.name }))
    //         .class_id;
    //     const output = await service.update(myClass_id, {
    //         name: "fjds;lak;jfdsalk",
    //     });
    //     expect(output).toBe("done");
    // });
    // it("should remove", async () => {
    //     const myClass_id = (await service.findOne({ name: body.name }))
    //         .class_id;
    //     const output = service.remove(myClass_id);
    //     expect(output).toBe("done");
    // });
});
