import { AuthController } from '@/controllers/auth.controller';
import { IRoute } from '@/interfaces/default/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class AuthRouter implements IRoute {
    public path = '/users';
    router: Router = Router();
    private controller: AuthController;

    constructor() {
        this.controller = new AuthController();
        this.init();
    }
    private init() {
        this.router.post('/', this.controller.register);
        this.router.post('/sessions', this.controller.signIn);
        this.router.delete('/logout', authValidate, this.controller.logout);
    }
}
