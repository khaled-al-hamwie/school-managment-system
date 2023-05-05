import { PickType } from "@nestjs/swagger";
import { CreateCredentialDto } from "src/modules/credentials/dto/create-credential.dto";

export class CreateAuthDto extends PickType(CreateCredentialDto, [
    "user_name",
    "password",
]) {}
