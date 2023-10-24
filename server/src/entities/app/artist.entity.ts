import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Album } from './album.entity';
import { User } from '../user.entity';

@Entity('artist')
export class Artist {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    info!: string;
    @Column({ nullable: true })
    image!: string;
    @Column({ nullable: false })
    userId!: number;
    @Column({ default: false })
    published!: boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @OneToMany(() => Album, (album) => album.artist, { onDelete: 'CASCADE' })
    albums!: Album[];
}
