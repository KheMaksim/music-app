import { Track } from '@/entities/app/track.entity';
import timeConvert from '@/helpers/timeConvert';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

const createTrackFactory = (initialNumeration: number) => {
    let numeration = initialNumeration;
    return setSeederFactory(Track, (faker: Faker) => {
        const track = new Track();
        track.name = faker.music.songName();
        track.duration = timeConvert(faker.number.int({ min: 10, max: 360 })).toString();
        track.numeration = numeration++;
        track.published = true;
        track.userId = faker.number.int({ min: 1, max: 5 });
        return track;
    });
};

const TrackFactory = createTrackFactory(1);

export default TrackFactory;
