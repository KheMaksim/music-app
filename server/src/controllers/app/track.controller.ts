import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { formatErrors } from '@/helpers/formatErrors';
import { TrackService } from '@/service/app/track.service';
import { TrackDto } from '@/dto/app/track.dto';
import { IRequest } from '@/interfaces/default/IRequest';

export class TrackController {
    private service: TrackService;

    constructor() {
        this.service = new TrackService();
    }

    getTracks: RequestHandler = async (req, res) => {
        const { album } = req.query;
        if (album) {
            try {
                if (isNaN(Number(album)) === true) {
                    throw new Error(`Not found album by id:${album}`);
                }
                const tracks = await this.service.getTracksByAlbum(Number(album));
                const response = { tracks: tracks, quantity: tracks.length };
                return res.send(response);
            } catch (error) {
                if (Array.isArray(error)) {
                    return res.status(400).send(formatErrors(error));
                } else {
                    return res.status(500).send({ message: (error as Error).message });
                }
            }
        } else {
            const tracks = await this.service.getTracks();
            return res.send(tracks);
        }
    };

    createTrack: RequestHandler = async (req: IRequest, res) => {
        const numeration = await this.service.getLastTrackNumber(req.body.albumId);
        const trackDto = { ...req.body, numeration: numeration === undefined ? `1` : (Number(numeration) + 1).toString() };
        const newTrackDto = plainToClass(TrackDto, trackDto, { excludeExtraneousValues: true });
        newTrackDto.userId = req.user.id.toString();
        try {
            const track = await this.service.createTrack(newTrackDto);
            res.send(track);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).send(formatErrors(error));
            } else {
                res.status(500).send({ message: 'Server internal error' });
            }
        }
    };

    publicateTrack: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error(`Not found track by id:${id}`);
            }
            const track = await this.service.publicateTrack(Number(id));
            return res.send(track);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };

    deleteTrack: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            if (isNaN(Number(id)) === true) {
                throw new Error('Invalid path.');
            }
            return res.send(await this.service.deleteTrack(Number(id)));
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: (error as Error).message });
            }
        }
    };
}
