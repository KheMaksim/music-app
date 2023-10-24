import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Artist } from './artist.entity';
import { Track } from './track.entity';
import { User } from '../user.entity';

@Entity('album')
export class Album {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    title!: string;
    @Column()
    year!: string;
    @Column({ nullable: true })
    image!: string;
    @Column()
    artistId!: number;
    @Column({ nullable: false })
    userId!: number;
    @Column({ default: false })
    published!: boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'artistId' })
    artist!: Artist;

    @OneToMany(() => Track, (track) => track.album, { onDelete: 'CASCADE' })
    tracks!: Track[];
}
