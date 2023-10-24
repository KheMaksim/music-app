import { ArtistController } from '@/controllers/app/artist.controller';
import { IRoute } from '@/interfaces/default/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { checkRole } from '@/middlewares/checkRole.middleware';
import { upload } from '@/middlewares/upload';
import { Router } from 'express';

export class ArtistRouter implements IRoute {
    public path = '/artists';
    public router = Router();
    private controller: ArtistController;

    constructor() {
        this.controller = new ArtistController();
        this.init();
    }

    private init() {
        this.router.get('/', this.controller.getArtists);
        this.router.get('/:id', this.controller.getArtistById);
        this.router.post('/', authValidate, upload.single('image'), this.controller.createArtist);
        this.router.post('/publish/:id', authValidate, checkRole('admin'), this.controller.publicateArtist);
        this.router.delete('/delete/:id', authValidate, this.controller.deleteArtist);
    }
}
