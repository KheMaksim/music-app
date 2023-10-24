import { TrackHistoryDto } from '@/dto/trackHistory.dto';
import { TrackHistory } from '@/entities/trackHistory.entity';
import { TrackHistoryRepository } from '@/repositories/trackHistory.repository';

export class TrackHistoryService {
    private repository: TrackHistoryRepository;

    constructor() {
        this.repository = new TrackHistoryRepository();
    }

    getHistory = async (token: string): Promise<TrackHistory[]> => {
        return await this.repository.getHistory(token);
    };

    createSession = async (trackHistoryDto: TrackHistoryDto): Promise<TrackHistory> => {
        return await this.repository.createSession(trackHistoryDto);
    };
}
