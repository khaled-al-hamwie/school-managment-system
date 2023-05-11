import { IsOptional, IsString } from "class-validator";
import { ManagerAttributes } from "../interfaces/manager.interface";

export class FindAllManagerDto {
    @IsOptional()
    @IsString()
    first_name?: ManagerAttributes["first_name"];

    @IsOptional()
    @IsString()
    last_name?: ManagerAttributes["last_name"];

    @IsOptional()
    @IsString()
    middle_name?: ManagerAttributes["middle_name"];
}
