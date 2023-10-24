import { AlbumController } from '@/controllers/app/album.controller';
import { IRoute } from '@/interfaces/default/IRoute.interface';
import { authValidate } from '@/middlewares/auth.middleware';
import { checkRole } from '@/middlewares/checkRole.middleware';
import { upload } from '@/middlewares/upload';
import { Router } from 'express';

export class AlbumRouter implements IRoute {
    public path = '/albums';
    public router = Router();
    private controller: AlbumController;

    constructor() {
        this.controller = new AlbumController();
        this.init();
    }

    private init() {
        this.router.get('/', this.controller.getAlbums);
        this.router.get('/:id', this.controller.getAlbumById);
        this.router.post('/', authValidate, upload.single('image'), this.controller.createAlbum);
        this.router.post('/publish/:id', authValidate, checkRole('admin'), this.controller.publicateAlbum);
        this.router.delete('/delete/:id', authValidate, this.controller.deleteAlbum);
    }
}
