import { Repository } from 'typeorm';
import { appDataSource } from '@/config/dataSource';
import { Album } from '@/entities/app/album.entity';
import { AlbumDto } from '@/dto/app/album.dto';

export class AlbumRepository extends Repository<Album> {
    constructor() {
        super(Album, appDataSource.createEntityManager());
    }

    async getAlbums() {
        return await this.find({
            relations: { artist: true },
            order: { year: 'ASC' },
        });
    }

    async getAlbumById(id: number) {
        const album = await this.findOne({
            where: { id },
            relations: { artist: true },
        });
        return album;
    }

    async getAlbumsByArtist(artistId: number) {
        const albums = await this.find({
            where: { artistId },
            relations: { artist: true },
            order: { year: 'ASC' },
        });
        return albums;
    }

    async createAlbum(albumDto: AlbumDto) {
        const album = await this.save(albumDto);
        return album;
    }

    async publicateAlbum(id: number) {
        const album = await this.getAlbumById(id);
        if (album) {
            album.published = true;
            await this.save(album);
        }
        return album;
    }

    async deleteAlbum(id: number): Promise<void> {
        await this.delete(id);
    }
}
