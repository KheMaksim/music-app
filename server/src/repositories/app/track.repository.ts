import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { Track } from '@/entities/app/track.entity';
import { TrackDto } from '@/dto/app/track.dto';

export class TrackRepository extends Repository<Track> {
    constructor() {
        super(Track, appDataSource.createEntityManager());
    }

    async getTracks() {
        return await this.find();
    }

    async getTracksByAlbum(albumId: number) {
        const tracks = await this.find({
            where: { albumId },
            relations: { album: true },
            order: { numeration: 'ASC' },
        });
        return tracks;
    }

    async getTrackById(id: number) {
        const track = await this.findOne({
            where: { id },
        });
        return track;
    }

    async getLastTrackNumber(albumId: number): Promise<string> {
        const maxNumeration = await this.createQueryBuilder('track')
            .select('MAX(track.numeration)', 'maxNumeration')
            .where('track.albumId = :albumId', { albumId })
            .getRawOne();
        return maxNumeration.maxNumeration || 0;
    }

    async createTrack(trackDto: TrackDto) {
        const track = await this.save(trackDto);
        return track;
    }

    async publicateTrack(id: number) {
        const track = await this.getTrackById(id);
        if (track) {
            track.published = true;
            await this.save(track);
        }
        return track;
    }

    async deleteTrack(id: number): Promise<void> {
        await this.delete(id);
    }
}
