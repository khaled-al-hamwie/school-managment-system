import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { CreateSubjectDto } from "../dto/create-subject.dto";

let body: CreateSubjectDto;

describe("create class dto", () => {
    beforeEach(() => {
        body = {
            name: "first class",
            class_id: 4,
            semester: 1,
        };
    });

    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateSubjectDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });
    describe("name", () => {
        const attr = "name";
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isString: `${attr} must be a string`,
                isLength: `${attr} must be longer than or equal to 3 characters`,
            });
        });
        it(`should not allow small ${attr}`, async () => {
            body[attr] = "1f      ";
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isLength: `${attr} must be longer than or equal to 3 characters`,
            });
        });
        it(`should not allow large ${attr}`, async () => {
            body[attr] = "1f      ".repeat(44);
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isLength: `${attr} must be shorter than or equal to 26 characters`,
            });
        });
    });

    describe("class_id", () => {
        const attr = "class_id";
        const min = 1;
        const max = 65536;
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
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
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                min: `${attr} must not be less than ${min}`,
            });
        });
        it(`should not allow ${attr} greater than ${max}`, async () => {
            body[attr] = max + 1;
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                max: `${attr} must not be greater than ${max}`,
            });
        });
        it(`should not allow decimal ${attr}`, async () => {
            body[attr] = 1.1;
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
            });
        });
    });
    describe("semester", () => {
        const attr = "semester";
        const min = 1;
        const max = 10;
        it(`should not allow no ${attr}`, async () => {
            delete body[attr];
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
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
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                min: `${attr} must not be less than ${min}`,
            });
        });
        it(`should not allow ${attr} greater than ${max}`, async () => {
            body[attr] = max + 1;
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                max: `${attr} must not be greater than ${max}`,
            });
        });
        it(`should not allow decimal ${attr}`, async () => {
            body[attr] = 1.1;
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(attr);
            expect(erros[0].constraints).toEqual({
                isInt: `${attr} must be an integer number`,
            });
        });
    });
    describe("teacher_ids", () => {
        const attr = "teacher_ids";
        it("should not allow a decimal", async () => {
            body[`${attr}`] = [1, 2, 1.1];
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                isInt: `each value in ${attr} must be an integer number`,
            });
        });
        it("should not allow a smaller than 1", async () => {
            const min = 1;
            body[`${attr}`] = [1, 2, min - 1];
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                min: `each value in ${attr} must not be less than ${min}`,
            });
        });
        it("should not allow a largger than 65535", async () => {
            const max = 65535;
            body[`${attr}`] = [1, 2, max + 1];
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                max: `each value in ${attr} must not be greater than ${max}`,
            });
        });
        it("should not allow a deplucate value ", async () => {
            body[`${attr}`] = [1, 2, 1];
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                arrayUnique: `All ${attr}'s elements must be unique`,
            });
        });
        it("should not allow empty array ", async () => {
            body[`${attr}`] = [];
            const ofImportDto = plainToInstance(CreateSubjectDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                arrayMinSize: `${attr} must contain at least 1 elements`,
            });
        });
    });
});
