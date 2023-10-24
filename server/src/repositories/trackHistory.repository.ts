import { appDataSource } from '@/config/dataSource';
import { TrackHistoryDto } from '@/dto/trackHistory.dto';
import { TrackHistory } from '@/entities/trackHistory.entity';
import { Repository } from 'typeorm';

export class TrackHistoryRepository extends Repository<TrackHistory> {
    constructor() {
        super(TrackHistory, appDataSource.createEntityManager());
    }

    async getHistory(token: string) {
        return await this.find({
            order: { datetime: 'DESC' },
            relations: { track: true },
            where: { user: { token } },
        });
    }

    async createSession(trackHistoryDto: TrackHistoryDto): Promise<TrackHistory> {
        const trackHistory = {
            ...trackHistoryDto,
            datetime: new Date(),
        };
        const track = await this.save(trackHistory);
        return track;
    }
}
