import { TrackDto } from '@/dto/app/track.dto';
import { Track } from '@/entities/app/track.entity';
import timeConvert from '@/helpers/timeConvert';
import { TrackRepository } from '@/repositories/app/track.repository';
import { validate } from 'class-validator';

export class TrackService {
    private repository: TrackRepository;

    constructor() {
        this.repository = new TrackRepository();
    }

    getTracks = async (): Promise<Track[]> => {
        return await this.repository.getTracks();
    };

    getTracksByAlbum = async (albumId: number): Promise<Track[]> => {
        return await this.repository.getTracksByAlbum(albumId);
    };

    getLastTrackNumber = async (albumId: number) => {
        return await this.repository.getLastTrackNumber(albumId);
    };

    createTrack = async (trackDto: TrackDto): Promise<Track> => {
        const errors = await validate(trackDto, { whitelist: true, validationError: { target: false, value: false } });
        if (errors.length) throw errors;
        const convertedTime = timeConvert(parseInt(trackDto.duration));
        const newTrackDto: TrackDto = { ...trackDto, duration: convertedTime };
        return await this.repository.createTrack(newTrackDto);
    };

    publicateTrack = async (id: number): Promise<Track | null> => {
        return await this.repository.publicateTrack(id);
    };

    deleteTrack = async (id: number): Promise<void> => {
        return await this.repository.deleteTrack(id);
    };
}
