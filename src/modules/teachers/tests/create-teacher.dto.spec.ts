import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { CreateTeacherDto } from "../dto/create-teacher.dto";

let body: CreateTeacherDto;

describe("create manager dto", () => {
    beforeEach(() => {
        body = {
            first_name: "test f",
            middle_name: "test f",
            last_name: "test f",
            phone_number: "+963 944233644",
            birth_day: new Date().toISOString(),
            gender: "f",
            nationality: "Uk",
            location: "damascus ,syria",
            salary: 100,

            email: "test@tes.com",
            password: "passwordpasswordpasswordpassword",
            user_name: "usserName",
        };
    });
    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateTeacherDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });
    describe("sallary", () => {
        it("should not be null", async () => {
            delete body["salary"];
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("salary");
            expect(erros[0].constraints).toEqual({
                isNumber:
                    "salary must be a number conforming to the specified constraints",
                isPositive: "salary must be a positive number",
            });
        });
        it("should be poositive", async () => {
            body["salary"] = -12;
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("salary");
            expect(erros[0].constraints).toEqual({
                isPositive: "salary must be a positive number",
            });
        });
        it("should be a number", async () => {
            body["salary"] = NaN;
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("salary");
            expect(erros[0].constraints).toEqual({
                isNumber:
                    "salary must be a number conforming to the specified constraints",
                isPositive: "salary must be a positive number",
            });
        });
        it("should be less than 2-digit number", async () => {
            body["salary"] = 1.213;
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("salary");
            expect(erros[0].constraints).toEqual({
                isNumber:
                    "salary must be a number conforming to the specified constraints",
            });
        });
    });
    describe("first_name,middle_name,last_name,location", () => {
        it("should not allow no first_name", async () => {
            delete body["first_name"];
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("first_name");
            expect(erros[0].constraints).toEqual({
                isString: "first_name must be a string",
                isLength:
                    "first_name must be longer than or equal to 3 characters",
            });
        });
        it("should not allow small first_name", async () => {
            body["first_name"] = "1f      ";
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("first_name");
            expect(erros[0].constraints).toEqual({
                isLength:
                    "first_name must be longer than or equal to 3 characters",
            });
        });
        it("should not allow large first_name", async () => {
            body["first_name"] = "1f      ".repeat(44);
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("first_name");
            expect(erros[0].constraints).toEqual({
                isLength:
                    "first_name must be shorter than or equal to 16 characters",
            });
        });
    });
    describe("nationality", () => {
        it("should pass without the nationality", async () => {
            delete body["nationality"];
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros.length).toBe(0);
        });
        it("should not allow small nationality", async () => {
            body["nationality"] = "1   ";
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("nationality");
            expect(erros[0].constraints).toEqual({
                isLength:
                    "nationality must be longer than or equal to 2 characters",
            });
        });
        it("should not allow large nationality", async () => {
            body["nationality"] = "1f      ".repeat(44);
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("nationality");
            expect(erros[0].constraints).toEqual({
                isLength:
                    "nationality must be shorter than or equal to 10 characters",
            });
        });
    });
    describe("gender", () => {
        const attr = "gender";
        it(`should not allow no ${attr}`, async () => {
            delete body[`${attr}`];
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                isEnum: `${attr} must be one of the following values: f, m`,
                isString: `${attr} must be a string`,
                isLength: `${attr} must be longer than or equal to 1 characters`,
            });
        });
        it(`should not allow small ${attr}`, async () => {
            body[`${attr}`] = `      `;
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                isEnum: `${attr} must be one of the following values: f, m`,
                isLength: `${attr} must be longer than or equal to 1 characters`,
            });
        });
        it(`should not allow large ${attr}`, async () => {
            body[attr] = `1F      `.repeat(44);
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                isEnum: `${attr} must be one of the following values: f, m`,
                isLength: `${attr} must be shorter than or equal to 2 characters`,
            });
        });
        it(`should not wrong ${attr}`, async () => {
            body[attr] = `a`;
            const ofImportDto = plainToInstance(CreateTeacherDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                isEnum: `${attr} must be one of the following values: f, m`,
            });
        });
    });
});
