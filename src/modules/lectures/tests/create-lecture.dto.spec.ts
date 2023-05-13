import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import "reflect-metadata";
import { CreateLectureDto, DayDto } from "../dto/create-lecture.dto";

let createLectureDto: CreateLectureDto;

describe("create a lecture dto", () => {
    beforeEach(() => {
        createLectureDto = new CreateLectureDto();
        createLectureDto.school_start = "12:00";
        createLectureDto.days = [
            { day: "mon", periods: [] },
            { day: "tue", periods: [] },
        ];
        createLectureDto.rests = [1];
    });
    it("should pass", async () => {
        const ofImportDto = plainToInstance(CreateLectureDto, createLectureDto);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros.length).toBe(0);
    });
    it("school_start must be of format HH:MM", async () => {
        const attr = "school_start";
        createLectureDto[attr] = "12:77";
        const ofImportDto = plainToInstance(CreateLectureDto, createLectureDto);
        const erros: ValidationError[] = await validate(ofImportDto);
        expect(erros).toEqual([
            {
                children: [],
                constraints: {
                    matches: `${attr} please provide a time in HH:MM format`,
                },
                property: attr,
                target: createLectureDto,
                value: createLectureDto[attr],
            },
        ]);
    });
    describe("rests", () => {
        const attr = "rests";
        it("should not be null", async () => {
            createLectureDto[attr] = null;
            const ofImportDto = plainToInstance(
                CreateLectureDto,
                createLectureDto
            );
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                arrayMinSize: `${attr} must contain at least 1 elements`,
                arrayUnique: `All ${attr}'s elements must be unique`,
                isArray: `${attr} must be an array`,
                isInt: `each value in ${attr} must be an integer number`,
            });
        });
        it("should not allow a decimal", async () => {
            createLectureDto[`${attr}`] = [1, 2, 1.1];
            const ofImportDto = plainToInstance(
                CreateLectureDto,
                createLectureDto
            );
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                isInt: `each value in ${attr} must be an integer number`,
            });
        });
        it("should not allow a deplucate value ", async () => {
            createLectureDto[`${attr}`] = [1, 2, 1];
            const ofImportDto = plainToInstance(
                CreateLectureDto,
                createLectureDto
            );
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros[0].property).toEqual(`${attr}`);
            expect(erros[0].constraints).toEqual({
                arrayUnique: `All ${attr}'s elements must be unique`,
            });
        });
    });
    describe("days", () => {
        const attr = "days";
        it("days at least one", async () => {
            createLectureDto[attr] = [];
            const ofImportDto = plainToInstance(
                CreateLectureDto,
                createLectureDto
            );
            const erros: ValidationError[] = await validate(ofImportDto);
            expect(erros).toEqual([
                {
                    children: [],
                    constraints: {
                        arrayMinSize: "days must contain at least 1 elements",
                    },
                    property: attr,
                    target: createLectureDto,
                    value: createLectureDto[attr],
                },
            ]);
        });
    });
});
