import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { CreateAuthDto } from "../dto/create-auth.dto";

let body: CreateAuthDto;

describe("chreate auth dto", () => {
    beforeEach(() => {
        body = {
            password: "1231247021fhdasjhfds",
            user_name: "thisisusernaem",
        };
    });
    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateAuthDto, body);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });
    describe("password", () => {
        it("should not allow no password", async () => {
            delete body["password"];
            const ofImportDto = plainToInstance(CreateAuthDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("password");
            expect(erros[0].constraints).toEqual({
                isString: "password must be a string",
                isLength:
                    "password must be longer than or equal to 20 characters",
                notContains: "password should not contain a space",
            });
        });
        it("should not allow small password", async () => {
            body["password"] = "1";
            const ofImportDto = plainToInstance(CreateAuthDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("password");
            expect(erros[0].constraints).toEqual({
                isLength:
                    "password must be longer than or equal to 20 characters",
            });
        });
        it("should not allow long password", async () => {
            body["password"] = "1".repeat(41);
            const ofImportDto = plainToInstance(CreateAuthDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("password");
            expect(erros[0].constraints).toEqual({
                isLength:
                    "password must be shorter than or equal to 40 characters",
            });
        });
        it("should not allow space password", async () => {
            body["password"] = "1 afjasdklfjsadlffffjas";
            const ofImportDto = plainToInstance(CreateAuthDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("password");
            expect(erros[0].constraints).toEqual({
                notContains: "password should not contain a space",
            });
        });
    });
    describe("user_name", () => {
        it("should not allow no user_name", async () => {
            delete body["user_name"];
            const ofImportDto = plainToInstance(CreateAuthDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("user_name");
            expect(erros[0].constraints).toEqual({
                isString: "user_name must be a string",
                isLength:
                    "user_name must be longer than or equal to 3 characters",
                notContains: "user_name should not contain a space",
            });
        });
        it("should not allow small user_name", async () => {
            body["user_name"] = "1";
            const ofImportDto = plainToInstance(CreateAuthDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("user_name");
            expect(erros[0].constraints).toEqual({
                isLength:
                    "user_name must be longer than or equal to 3 characters",
            });
        });
        it("should not allow long user_name", async () => {
            body["user_name"] = "1".repeat(46);
            const ofImportDto = plainToInstance(CreateAuthDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("user_name");
            expect(erros[0].constraints).toEqual({
                isLength:
                    "user_name must be shorter than or equal to 45 characters",
            });
        });
        it("should not allow space user_name", async () => {
            body["user_name"] = "1 afjasdklfjsadlffffjas";
            const ofImportDto = plainToInstance(CreateAuthDto, body);
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual("user_name");
            expect(erros[0].constraints).toEqual({
                notContains: "user_name should not contain a space",
            });
        });
    });
});
