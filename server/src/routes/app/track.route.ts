import { TrackController } from '@/controllers/app/track.controller';
import { IRoute } from '@/interfaces/default/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { checkRole } from '@/middlewares/checkRole.middleware';
import { Router } from 'express';

export class TrackRouter implements IRoute {
    public path = '/tracks';
    public router = Router();
    private controller: TrackController;

    constructor() {
        this.controller = new TrackController();
        this.init();
    }

    private init() {
        this.router.get('/', this.controller.getTracks);
        this.router.post('/', authValidate, this.controller.createTrack);
        this.router.post('/publish/:id', authValidate, checkRole('admin'), this.controller.publicateTrack);
        this.router.delete('/delete/:id', authValidate, this.controller.deleteTrack);
    }
}
