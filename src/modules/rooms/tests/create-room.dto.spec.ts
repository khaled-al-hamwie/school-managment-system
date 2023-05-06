import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { CreateRoomDto } from "../dto/create-room.dto";

let body: CreateRoomDto;

describe("create room dto", () => {
    beforeEach(() => {
        body = {
            student_count: 12,
            class_id: 1,
        };
    });

    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateRoomDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });
    describe("class_id", () => {
        let attr = "class_id";
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
        it(`should not allow string ${attr}`, async () => {
            body[attr] = "1f      ";
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

    describe("student_count", () => {
        let attr = "student_count";
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
        it(`should not allow string ${attr}`, async () => {
            body[attr] = "1f      ";
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
});
