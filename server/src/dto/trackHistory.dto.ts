import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class TrackHistoryDto {
    @Expose()
    @IsNumberString()
    @IsNotEmpty()
    trackId!: number;
    @Expose()
    @IsNumberString()
    @IsNotEmpty()
    userId!: number;
    @Expose()
    @IsNumberString()
    @IsNotEmpty()
    datetime!: string;
}
