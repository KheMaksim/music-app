import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { formatErrors } from '@/helpers/formatErrors';
import { AlbumService } from '@/service/app/album.service';
import { AlbumDto } from '@/dto/app/album.dto';
import { IRequest } from '@/interfaces/default/IRequest';

export class AlbumController {
    private service: AlbumService;

    constructor() {
        this.service = new AlbumService();
    }

    getAlbums: RequestHandler = async (req, res) => {
        const { artist } = req.query;
        if (artist) {
            try {
                if (isNaN(Number(artist)) === true) {
                    throw new Error('Invalid path.');
                }
                const albums = await this.service.getAlbumsByArtist(Number(artist));
                return res.send(albums);
            } catch (error) {
                if (Array.isArray(error)) {
                    return res.status(400).send(formatErrors(error));
                } else {
                    return res.status(500).send({ message: (error as Error).message });
                }
            }
        } else {
            const albums = await this.service.getAlbums();
            return res.send(albums);
        }
    };

    getAlbumById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error(`Not found album by id:${id}`);
            }
            const album = await this.service.getAlbumById(Number(id));
            return res.send(album);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    createAlbum: RequestHandler = async (req: IRequest, res) => {
        const albumDto = plainToInstance(AlbumDto, req.body, { excludeExtraneousValues: true });
        if (req.file) albumDto.image = req.file.filename;
        albumDto.userId = req.user.id.toString();
        try {
            const album = await this.service.createAlbum(albumDto);
            res.send(album);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).send(formatErrors(error));
            } else {
                res.status(500).send({ message: 'Server internal error' });
            }
        }
    };

    publicateAlbum: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error(`Not found album by id:${id}`);
            }
            const album = await this.service.publicateAlbum(Number(id));
            return res.send(album);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    deleteAlbum: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error('Invalid path.');
            }
            return res.send(await this.service.deleteAlbum(Number(id)));
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };
}
