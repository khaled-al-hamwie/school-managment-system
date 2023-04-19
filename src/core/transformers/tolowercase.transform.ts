import { TransformFnParams } from "class-transformer";

export default function tolowerCaseTransform({ value }: TransformFnParams) {
	if (value && typeof value == "string") {
		return value.toLocaleLowerCase();
	}
	return false;
}
