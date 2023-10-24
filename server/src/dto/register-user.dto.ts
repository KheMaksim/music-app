import { IsUserAlreadyExist } from '@/validators/IsUniqueUserName';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsUserAlreadyExist({ message: 'User $value already exists. Choose another name.' })
    username!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    password!: string;
}
