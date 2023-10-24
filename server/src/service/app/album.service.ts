import { AlbumDto } from '@/dto/app/album.dto';
import { Album } from '@/entities/app/album.entity';
import { AlbumRepository } from '@/repositories/app/album.repository';
import { validate } from 'class-validator';

export class AlbumService {
    private repository: AlbumRepository;

    constructor() {
        this.repository = new AlbumRepository();
    }

    getAlbums = async (): Promise<Album[]> => {
        return await this.repository.getAlbums();
    };

    getAlbumById = async (id: number): Promise<Album | null> => {
        const album = await this.repository.getAlbumById(id);
        return album;
    };

    getAlbumsByArtist = async (artistId: number): Promise<Album[]> => {
        const album = await this.repository.getAlbumsByArtist(artistId);
        return album;
    };

    createAlbum = async (albumDto: AlbumDto): Promise<Album> => {
        const errors = await validate(albumDto, { whitelist: true, validationError: { target: false, value: false } });
        if (errors.length) throw errors;
        return await this.repository.createAlbum(albumDto);
    };

    publicateAlbum = async (id: number): Promise<Album | null> => {
        return await this.repository.publicateAlbum(id);
    };

    deleteAlbum = async (id: number): Promise<void> => {
        return await this.repository.deleteAlbum(id);
    };
}
