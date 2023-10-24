import { RegisterUserDto } from '@/dto/register-user.dto';
import { SignInUserDto } from '@/dto/sign-in-user.dto';
import { IUser } from '@/interfaces/IUser.interface';
import { UserRepository } from '@/repositories/user.repository';

export class AuthService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    sigIn = async (singInUserDto: SignInUserDto): Promise<IUser> => {
        return await this.repository.signIn(singInUserDto);
    };

    register = async (registerUSerDto: RegisterUserDto): Promise<IUser> => {
        return await this.repository.register(registerUSerDto);
    };

    getUserByToken = async (token: string): Promise<IUser | null> => {
        return await this.repository.getUserByToken(token);
    };

    async logout(token: string): Promise<void> {
        await this.repository.clearToken(token);
    }
}
