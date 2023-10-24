import { UserRepository } from '@/repositories/user.repository';
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

@ValidatorConstraint({ name: 'isUniqueUserName', async: true })
export class isUniqueUserNameConstrain implements ValidatorConstraintInterface {
    validate(username: string): boolean | Promise<boolean> {
        const repository = new UserRepository();
        const user = repository.getUserByUsername(username);
        return !!user;
    }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isUniqueUserNameConstrain,
        });
    };
}
