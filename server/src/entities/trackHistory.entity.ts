import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Track } from './app/track.entity';

@Entity('track_history')
export class TrackHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    userId!: number;

    @Column({ nullable: false })
    trackId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    datetime!: Date;

    @ManyToOne(() => Track)
    @JoinColumn({ name: 'trackId' })
    track!: Track;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;
}
