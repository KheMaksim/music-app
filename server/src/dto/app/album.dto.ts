import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class AlbumDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле title обязательное' })
    @IsString()
    title!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле artist обязательное' })
    @IsNumberString()
    artistId!: number;

    @Expose()
    @IsNotEmpty({ message: 'Поле year обязательное' })
    @IsNumberString()
    year!: string;

    @Expose()
    @IsOptional()
    image!: string;

    @Expose()
    @IsNumberString()
    @IsNotEmpty()
    userId!: number;
}
