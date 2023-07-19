import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidDate', async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
    validate(date: any): boolean {
        // Check if the date is valid
        return !isNaN(new Date(date).getTime());
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Invalid date format';
    }
}

export function IsValidDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidDateConstraint,
        });
    };
}