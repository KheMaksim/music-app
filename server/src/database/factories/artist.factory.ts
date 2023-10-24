import { Artist } from '@/entities/app/artist.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

const ArtistFactory = setSeederFactory(Artist, (faker: Faker) => {
    const artist = new Artist();
    artist.name = faker.person.fullName();
    artist.info = faker.lorem.sentence();
    artist.published = true;
    const random = faker.number.int({ min: 1, max: 5 });
    artist.userId = random;
    switch (random) {
        case 1:
            artist.image = '1.jpg';
            break;
        case 2:
            artist.image = '2.jpg';
            break;
        case 3:
            artist.image = '3.jpg';
            break;
        case 4:
            artist.image = '4.jpg';
            break;
        case 5:
            artist.image = '5.jpg';
            break;
        default:
            break;
    }
    return artist;
});

export default ArtistFactory;
