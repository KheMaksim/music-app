import AlbumFactory from '@/database/factories/album.factory';
import ArtistFactory from '@/database/factories/artist.factory';
import TrackFactory from '@/database/factories/track.factory';
import UserFactory from '@/database/factories/user.factory';
import MainSeeder from '@/database/seeds/main.seeder';
import { Album } from '@/entities/app/album.entity';
import { Artist } from '@/entities/app/artist.entity';
import { Track } from '@/entities/app/track.entity';
import { TrackHistory } from '@/entities/trackHistory.entity';
import { User } from '@/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'music',
    username: 'root',
    password: 'root',
    synchronize: true,
    logging: false,
    entities: [Artist, Album, Track, User, TrackHistory],
    factories: [UserFactory, ArtistFactory, AlbumFactory, TrackFactory],
    seeds: [MainSeeder],
};

export const appDataSource = new DataSource(options);
