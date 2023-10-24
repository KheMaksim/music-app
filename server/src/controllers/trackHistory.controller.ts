import { TrackHistoryDto } from '@/dto/trackHistory.dto';
import { formatErrors } from '@/helpers/formatErrors';
import { IRequest } from '@/interfaces/default/IRequest';
import { TrackHistoryService } from '@/service/trackHistory.service';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export class TrackHistoryController {
    private service: TrackHistoryService;

    constructor() {
        this.service = new TrackHistoryService();
    }

    getHistory: RequestHandler = async (req, res) => {
        const token = req.headers.authorization;
        const history = await this.service.getHistory(token!);
        res.send(history);
    };

    createSession: RequestHandler = async (req: IRequest, res) => {
        const trackId = req.body.trackId;
        const historyData = {
            trackId,
            userId: req.user.id,
        };
        const trackDto = plainToInstance(TrackHistoryDto, historyData, { excludeExtraneousValues: true });
        try {
            const track = await this.service.createSession(trackDto);
            return res.send(track);
        } catch (error) {
            if (Array.isArray(error)) {
                return res.status(400).send(formatErrors(error));
            } else {
                return res.status(500).send({ message: 'Server internal error' });
            }
        }
    };
}
