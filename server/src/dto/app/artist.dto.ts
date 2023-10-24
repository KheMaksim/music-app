import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ArtistDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле name обязательное' })
    @IsString()
    name!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле info обязательное' })
    @IsString()
    info!: string;

    @Expose()
    @IsOptional()
    image!: string;

    @Expose()
    @IsNumberString()
    @IsNotEmpty()
    userId!: number;
}
