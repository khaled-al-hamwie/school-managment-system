import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { CreateClassDto } from "../dto/create-class.dto";

let body: CreateClassDto;

describe("create class dto", () => {
    beforeEach(() => {
        body = {
            name: "first class",
            max_rooms: 5,
        };
    });

    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateClassDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });
    describe("name", () => {
        let attr = "name";
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isString: `${attr} must be a string`,
                isLength: `${attr} must be longer than or equal to 3 characters`,
            });
        });
        it(`should not allow small ${attr}`, async () => {
            body[attr] = "1f      ";
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isLength: `${attr} must be longer than or equal to 3 characters`,
            });
        });
        it(`should not allow large ${attr}`, async () => {
            body[attr] = "1f      ".repeat(44);
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isLength: `${attr} must be shorter than or equal to 16 characters`,
            });
        });
    });
    describe("max-rooms", () => {
        let attr = "max_rooms";
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
                isPositive: `${attr} must be a positive number`,
            });
        });
        it(`should not allow string ${attr}`, async () => {
            body[attr] = "1f      ";
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
                isPositive: `${attr} must be a positive number`,
            });
        });
        it(`should not allow negative ${attr}`, async () => {
            body[attr] = -3;
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isPositive: `${attr} must be a positive number`,
            });
        });
        it(`should not allow decimal ${attr}`, async () => {
            body[attr] = 0.1;
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
            });
        });
    });
});
