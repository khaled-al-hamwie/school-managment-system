import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Class } from "src/modules/classes/entities/class.entity";
import { setTimeout } from "timers/promises";
import { CreateRoomDto } from "../dto/create-room.dto";
import { RoomsService } from "../rooms.service";

describe("RoomsService", () => {
    let service: RoomsService;
    let body: CreateRoomDto;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        service = module.get<RoomsService>(RoomsService);
        await Class.create({ class_id: 3, name: "fafa" });
        body = {
            class_id: 3,
            days: ["fri", "mon"],
            lecture_number: 6,
            rests: [1, 3],
            school_start: "07:00",
            student_count: 10,
            name: "dfjs;alk",
        };
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should create a class", async () => {
        const output = await service.create(body);
        expect(output).toBe("done");
    });
    it("should not create with unvalid class id", async () => {
        try {
            await service.create({
                class_id: -1,
                days: ["fri", "mon"],
                lecture_number: 6,
                rests: [1, 3],
                school_start: "07:00",
                student_count: 10,
                name: "dfjs;alk",
            });
        } catch (error) {
            expect(error.name).toBe("NotFoundException");
        }
    });
    it("should find", async () => {
        await setTimeout(1000);
        const output = await service.findOne({ name: body.name });
        expect(output).not.toBeNull();
    });
    it("should update", async () => {
        const room = (await service.findOne({ name: body.name })).room_id;
        const output = await service.update(room, {
            name: "fjds;lak;new",
            student_count: 20,
        });
        expect(output).toBe("done");
    });
    afterAll(async () => {
        await Class.destroy({ where: {} });
    });
});
