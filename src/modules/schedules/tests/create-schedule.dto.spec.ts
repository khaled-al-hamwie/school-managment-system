import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { CreateScheduleDto } from "../dto/create-schedule.dto";

let body: CreateScheduleDto;
describe("create schedule dto", () => {
    beforeEach(() => {
        body = {
            title: "class 1 room 1 section 1",
            school_start: "12:30",
            lecture_number: 12,
            days: ["fri", "sat", "sun", "mon", "tue"],
            rests: [2, 4],
        };
    });

    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateScheduleDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });

    describe("title", () => {
        const attr = "title";
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
        it(`should not allow small ${attr}`, async () => {
            body[attr] = "1f      ";
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
        it(`should not allow large ${attr}`, async () => {
            body[attr] = "1f      ".repeat(44);
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
    });

    it("school_start is A time", async () => {
        const attr = "school_start";
        body[attr] = "12:77";
        const ofImportDto = plainToInstance(CreateScheduleDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBeGreaterThanOrEqual(1);
    });

    describe("lecture_number", () => {
        const attr = "lecture_number";
        const min = 1;
        const max = 20;
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
        it(`should not allow ${attr} less than ${min}`, async () => {
            body[attr] = 0;
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
        it(`should not allow ${attr} greater than ${max}`, async () => {
            body[attr] = max + 1;
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
        it(`should not allow decimal ${attr}`, async () => {
            body[attr] = 1.1;
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("days", () => {
        const attr = "days";
        it("days at least one", async () => {
            body[attr] = [];
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });

        it("day names are unique", async () => {
            body[attr].push("fri", "fri");
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("rests", () => {
        const attr = "rests";
        it(`${attr} should not be deleted`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });

        it(`${attr} should not be empty array`, async () => {
            body[attr] = [];
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });

        it(`${attr} should only has integer number `, async () => {
            body[attr] = [1, 2.5];
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
        it(`${attr} should only has positive number `, async () => {
            body[attr] = [1, -1];
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });

        it(`${attr} should only has uniqe number `, async () => {
            body[attr] = [1, 1];
            const ofImportDto = plainToInstance(CreateScheduleDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBeGreaterThanOrEqual(1);
        });
    });
});
