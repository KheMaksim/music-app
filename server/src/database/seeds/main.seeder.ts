import { Album } from '@/entities/app/album.entity';
import { Artist } from '@/entities/app/artist.entity';
import { Track } from '@/entities/app/track.entity';
import { User } from '@/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory = factoryManager.get(User);
        await userFactory.save({ username: 'user', password: '1' });
        await userFactory.save({ username: 'admin', password: '1', role: 'admin' });
        await userFactory.saveMany(3);

        const artistFactory = factoryManager.get(Artist);
        const albumFactory = factoryManager.get(Album);
        const trackFactory = factoryManager.get(Track);

        const albumRepository = dataSource.getRepository(Album);
        const trackRepository = dataSource.getRepository(Track);

        const artists = await artistFactory.saveMany(4);

        await Promise.all(
            artists.map(async (artist) => {
                const albums = await albumFactory.saveMany(4, { artist: artist });
                await albumRepository.save(albums);
                await Promise.all(
                    albums.map(async (album) => {
                        const tracks = await trackFactory.saveMany(4, { album: album });
                        await trackRepository.save(tracks);
                        return;
                    }),
                );
                return;
            }),
        );
    }
}
