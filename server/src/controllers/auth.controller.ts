import { RegisterUserDto } from '@/dto/register-user.dto';
import { SignInUserDto } from '@/dto/sign-in-user.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { IRequest } from '@/interfaces/default/IRequest';
import { AuthService } from '@/service/auth.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';

export class AuthController {
    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    signIn: RequestHandler = async (req, res) => {
        const signInUserDto = plainToInstance(SignInUserDto, req.body);
        try {
            if (!signInUserDto.username || !signInUserDto.password) {
                throw new Error(`Username and password required`);
            }
            const user = await this.service.sigIn(signInUserDto);
            return res.send(user);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ error: { message: (error as Error).message } });
            }
        }
    };

    register: RequestHandler = async (req, res) => {
        try {
            const registerUserDto = plainToInstance(RegisterUserDto, req.body);
            const errors = await validate(registerUserDto, { whitelist: true, validationError: { target: false, value: false } });

            if (errors.length > 0) return res.status(400).send(formatErrors(errors));
            const user = await this.service.register(registerUserDto);
            return res.send(user);
        } catch (e) {
            if ((e as { code: string }).code === 'ER_DUP_ENTRY') {
                return res.status(400).send({ error: { message: 'User already exist' } });
            }
            return res.status(500).send({ error: { message: 'Internal server error' } });
        }
    };

    logout: RequestHandler = async (req: IRequest, res) => {
        if (!req.user?.token) return res.send({ message: `success` });
        try {
            const { token } = req.user;
            await this.service.logout(token);
        } catch (e) {
            return res.status(500).send({ error: { message: 'Internal server error' } });
        }
        return res.send({ message: `success ` });
    };
}
