import { IRequest } from '@/interfaces/default/IRequest';
import { AuthService } from '@/service/auth.service';
import { RequestHandler } from 'express';

const authService = new AuthService();

export const authValidate: RequestHandler = async (req: IRequest, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ error: { message: 'No token present' } });
        }
        const user = await authService.getUserByToken(token);
        if (!user) return res.status(401).send({ error: { message: 'Wrong token' } });
        req.user = user;
        return next();
    } catch (e) {
        return res.status(500).send({ error: { message: 'Internal server error' } });
    }
};
