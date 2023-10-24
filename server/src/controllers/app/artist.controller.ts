import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { formatErrors } from '@/helpers/formatErrors';
import { ArtistService } from '@/service/app/artist.service';
import { ArtistDto } from '@/dto/app/artist.dto';
import { IRequest } from '@/interfaces/default/IRequest';

export class ArtistController {
    private service: ArtistService;

    constructor() {
        this.service = new ArtistService();
    }

    getArtists: RequestHandler = async (_req, res) => {
        res.send(await this.service.getArtists());
    };

    getArtistById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error(`Not found artist by id:${id}`);
            }
            const artist = await this.service.getArtistById(Number(id));
            return res.send(artist);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    createArtist: RequestHandler = async (req: IRequest, res) => {
        const artistDto = plainToInstance(ArtistDto, req.body, { excludeExtraneousValues: true });
        if (req.file) artistDto.image = req.file.filename;
        artistDto.userId = req.user.id.toString();
        try {
            const artist = await this.service.createArtist(artistDto);
            res.send(artist);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).send(formatErrors(error));
            } else {
                res.status(500).send({ message: 'Server internal error' });
            }
        }
    };

    publicateArtist: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error(`Not found artist by id:${id}`);
            }
            const artist = await this.service.publicateArtist(Number(id));
            return res.send(artist);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    deleteArtist: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error('Invalid path.');
            }
            return res.send(await this.service.deleteArtist(Number(id)));
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };
}
