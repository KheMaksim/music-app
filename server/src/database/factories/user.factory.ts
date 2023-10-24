import { User } from '@/entities/user.entity';
import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

const UserFactory = setSeederFactory(User, (faker: Faker) => {
    const user = new User();
    user.username = faker.internet.userName();
    user.password = '1';
    user.hashPassword();
    user.generateToken();
    return user;
});

export default UserFactory;
