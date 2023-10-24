import { User } from '@/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory = factoryManager.get(User);
        await userFactory.save({ username: 'user', password: '1' });
        await userFactory.save({ username: 'admin', password: '1', role: 'admin' });
    }
}
