import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { CreateClassDto } from "../dto/create-class.dto";

let body: CreateClassDto;

describe("create class dto", () => {
    beforeEach(() => {
        body = {
            name: "first class",
            lecture_length: 20,
            rest_length: 5,
            number_of_lectures: 4,
            year: "2020-2021",
        };
    });

    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateClassDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });
    describe("name", () => {
        const attr = "name";
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
    it("year", async () => {
        const attr = "year";
        body[attr] = "202a/2021";
        const ofImportDto = plainToInstance(CreateClassDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros[0].property).toEqual(attr);
        expect(erros[0].constraints).toEqual({
            matches: `provide a year of format 2021-2022`,
        });
    });
    describe("number_of_lectures, lecture_length, rest_length", () => {
        const attr = "number_of_lectures";
        const min = 1;
        const max = 255;
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
                min: `${attr} must not be less than ${min}`,
                max: `${attr} must not be greater than ${max}`,
            });
        });
        it(`should not allow ${attr} less than ${min}`, async () => {
            body[attr] = 0;
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                min: `${attr} must not be less than ${min}`,
            });
        });
        it(`should not allow ${attr} greater than ${max}`, async () => {
            body[attr] = 256;
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                max: `${attr} must not be greater than ${max}`,
            });
        });
        it(`should not allow decimal ${attr}`, async () => {
            body[attr] = 1.1;
            const ofImportDto = plainToInstance(CreateClassDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
            });
        });
    });
});
