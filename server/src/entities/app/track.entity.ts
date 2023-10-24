import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Index } from 'typeorm';
import { Album } from './album.entity';
import { User } from '../user.entity';

@Entity('track')
@Index(['numeration', 'albumId'], { unique: true })
export class Track {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    duration!: string;
    @Column()
    numeration!: number;
    @Column()
    albumId!: number;
    @Column({ nullable: false })
    userId!: number;
    @Column({ default: false })
    published!: boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'albumId' })
    album!: Album;
}
