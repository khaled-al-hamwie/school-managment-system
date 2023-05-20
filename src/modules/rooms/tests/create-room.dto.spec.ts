import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { CreateRoomDto } from "../dto/create-room.dto";

let body: CreateRoomDto;

describe("create room dto", () => {
    beforeEach(() => {
        body = {
            student_count: 12,
            name: "test",
            class_id: 1,
            days: ["sat", "sun"],
            school_start: "07:30",
            lecture_number: 6,
            rests: [1, 3],
        };
    });

    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateRoomDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });
    describe("class_id", () => {
        const attr = "class_id";
        const min = 1;
        const max = 65535;
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
                max: `${attr} must not be greater than ${max}`,
                min: `${attr} must not be less than ${min}`,
            });
        });
        it(`should not allow ${attr} smaller than ${min}`, async () => {
            body[attr] = -3;
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                min: `${attr} must not be less than ${min}`,
            });
        });
        it(`should not allow ${attr} larger than ${max}`, async () => {
            body[attr] = max + 1;
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                max: `${attr} must not be greater than ${max}`,
            });
        });
        it(`should not allow decimal ${attr}`, async () => {
            body[attr] = 1.1;
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
            });
        });
    });

    describe("name", () => {
        const attr = "name";
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isString: `${attr} must be a string`,
                isLength: `${attr} must be longer than or equal to 3 characters`,
            });
        });
        it(`should not allow small ${attr}`, async () => {
            body[attr] = "1f      ";
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isLength: `${attr} must be longer than or equal to 3 characters`,
            });
        });
        it(`should not allow large ${attr}`, async () => {
            body[attr] = "1f      ".repeat(44);
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isLength: `${attr} must be shorter than or equal to 16 characters`,
            });
        });
    });

    describe("student_count", () => {
        const attr = "student_count";
        const min = 1;
        const max = 255;
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
                max: `${attr} must not be greater than ${max}`,
                min: `${attr} must not be less than ${min}`,
            });
        });
        it(`should not allow ${attr} smaller than ${min}`, async () => {
            body[attr] = -3;
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                min: `${attr} must not be less than ${min}`,
            });
        });
        it(`should not allow ${attr} larger than ${max}`, async () => {
            body[attr] = max + 1;
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                max: `${attr} must not be greater than ${max}`,
            });
        });
        it(`should not allow decimal ${attr}`, async () => {
            body[attr] = 1.1;
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
            });
        });
    });
    describe("student_ids", () => {
        const attr = "student_ids";
        it("should not allow a decimal", async () => {
            body[`${attr}`] = [1, 2, 1.1];
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                isInt: `each value in ${attr} must be an integer number`,
            });
        });
        it("should not allow a smaller than 1", async () => {
            const min = 1;
            body[`${attr}`] = [1, 2, min - 1];
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                min: `each value in ${attr} must not be less than ${min}`,
            });
        });
        it("should not allow a largger than 65535", async () => {
            const max = 65535;
            body[`${attr}`] = [1, 2, max + 1];
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                max: `each value in ${attr} must not be greater than ${max}`,
            });
        });
        it("should not allow a deplucate value ", async () => {
            body[`${attr}`] = [1, 2, 1];
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                arrayUnique: `All ${attr}'s elements must be unique`,
            });
        });
        it("should not allow empty array ", async () => {
            body[`${attr}`] = [];
            const ofImportDto = plainToInstance(CreateRoomDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                arrayMinSize: `${attr} must contain at least 1 elements`,
            });
        });
    });
});
