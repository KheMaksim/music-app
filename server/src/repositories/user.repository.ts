import { appDataSource } from '@/config/dataSource';
import { RegisterUserDto } from '@/dto/register-user.dto';
import { SignInUserDto } from '@/dto/sign-in-user.dto';
import { User } from '@/entities/user.entity';
import { IUser } from '@/interfaces/IUser.interface';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
    constructor() {
        super(User, appDataSource.createEntityManager());
    }

    async signIn(signInUserDto: SignInUserDto): Promise<IUser> {
        const user = await this.findOne({ where: { username: signInUserDto.username } });
        if (!user) throw new Error('User not exist');
        const isMatch = await user.comparePassword(signInUserDto.password);
        if (!isMatch) throw new Error('Login or password is wrong');
        user.generateToken();
        const userWithToken: IUser = await this.save(user);
        delete userWithToken.password;
        return userWithToken;
    }

    async register(registerUserDto: RegisterUserDto): Promise<IUser> {
        const userData = await this.create(registerUserDto);
        userData.generateToken();
        const user: IUser = await this.save(userData);
        delete user.password;
        return user;
    }

    async getUserByToken(token: string) {
        return await this.findOneBy({ token });
    }

    async getUserByUsername(username: string): Promise<IUser | null> {
        return await this.findOneBy({ username });
    }

    async clearToken(token: string) {
        const user = await this.getUserByToken(token);
        if (!user) return;
        user?.generateToken();
        this.save(user);
    }
}
