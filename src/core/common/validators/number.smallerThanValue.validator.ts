import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "", async: false })
export class NumberSmallerThanValue implements ValidatorConstraintInterface {
    validate(
        value: number,
        validationArguments?: ValidationArguments,
    ): boolean | Promise<boolean> {
        if (
            value &&
            value >
                validationArguments.object[validationArguments.constraints[0]]
        )
            return false;
        return true;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `the ${validationArguments.property} of value ${validationArguments.value} can't be bigger than the ${validationArguments.constraints[0]}`;
    }
}
