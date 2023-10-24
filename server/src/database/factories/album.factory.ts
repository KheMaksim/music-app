import { Album } from '@/entities/app/album.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

const AlbumFactory = setSeederFactory(Album, (faker: Faker) => {
    const album = new Album();
    album.title = faker.music.genre();
    album.year = faker.number.int({ min: 2018, max: 2023 }).toString();
    album.published = true;
    const random = faker.number.int({ min: 1, max: 5 });
    album.userId = random;
    switch (random) {
        case 1:
            album.image = '1.jpg';
            break;
        case 2:
            album.image = '2.png';
            break;
        case 3:
            album.image = '3.jpg';
            break;
        case 4:
            album.image = '4.jpg';
            break;
        case 5:
            album.image = '5.jpg';
            break;
        default:
            break;
    }
    return album;
});

export default AlbumFactory;
