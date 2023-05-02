import { TransformFnParams } from "class-transformer";

export default function trimTransform({ value }: TransformFnParams) {
    if (value && typeof value == "string") {
        return value.trim();
    }
    return false;
}
