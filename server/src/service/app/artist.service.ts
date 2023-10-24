import { ArtistDto } from '@/dto/app/artist.dto';
import { Artist } from '@/entities/app/artist.entity';
import { ArtistRepository } from '@/repositories/app/artist.repository';
import { validate } from 'class-validator';

export class ArtistService {
    private repository: ArtistRepository;

    constructor() {
        this.repository = new ArtistRepository();
    }

    getArtists = async (): Promise<Artist[]> => {
        return await this.repository.getArtists();
    };

    getArtistById = async (id: number): Promise<Artist | null> => {
        return await this.repository.getArtistById(id);
    };

    createArtist = async (artistDto: ArtistDto): Promise<Artist> => {
        const errors = await validate(artistDto, { whitelist: true, validationError: { target: false, value: false } });
        if (errors.length) throw errors;
        return await this.repository.createArtist(artistDto);
    };

    publicateArtist = async (id: number): Promise<Artist | null> => {
        return await this.repository.publicateArtist(id);
    };

    deleteArtist = async (id: number): Promise<void> => {
        return await this.repository.deleteArtist(id);
    };
}
