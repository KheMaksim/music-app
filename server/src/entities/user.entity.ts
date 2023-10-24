import crypto from 'crypto';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ unique: true })
    username!: string;
    @Column()
    password!: string;
    @Column({ nullable: true, type: 'varchar' })
    token?: string;
    @Column({ default: 'user' })
    role!: 'user' | 'admin';

    @BeforeInsert()
    async hashPassword() {
        const SALT_WORK_FACTOR = 10;
        if (this.password) {
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    generateToken() {
        this.token = crypto.randomUUID();
    }
}
