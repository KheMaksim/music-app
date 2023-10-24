import { TrackHistoryController } from '@/controllers/trackHistory.controller';
import { IRoute } from '@/interfaces/default/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class TrackHistoryRouter implements IRoute {
    public path = '/trackHistory';
    router: Router = Router();
    private controller: TrackHistoryController;

    constructor() {
        this.controller = new TrackHistoryController();
        this.init();
    }
    private init() {
        this.router.get('/', authValidate, this.controller.getHistory);
        this.router.post('/', authValidate, this.controller.createSession);
    }
}
