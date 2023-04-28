import { ValidationPipe } from "@nestjs/common";
import { ValidationOptions } from "./constants/ValidationOptions";

export const MainValidationPipe: ValidationPipe = new ValidationPipe(
	ValidationOptions
);
