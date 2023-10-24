import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { Artist } from '@/entities/app/artist.entity';
import { ArtistDto } from '@/dto/app/artist.dto';

export class ArtistRepository extends Repository<Artist> {
    constructor() {
        super(Artist, appDataSource.createEntityManager());
    }

    async getArtists() {
        return await this.find();
    }

    async getArtistById(id: number) {
        const artist = await this.findOne({
            where: { id },
        });
        return artist;
    }

    async createArtist(artistDto: ArtistDto) {
        const artist = await this.save(artistDto);
        return artist;
    }

    async publicateArtist(id: number) {
        const artist = await this.getArtistById(id);
        if (artist) {
            artist.published = true;
            await this.save(artist);
        }
        return artist;
    }

    async deleteArtist(id: number): Promise<void> {
        await this.delete(id);
    }
}
