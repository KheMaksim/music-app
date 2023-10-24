import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class TrackDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле name обязательное' })
    @IsString()
    name!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле duration обязательное' })
    @IsNumberString()
    duration!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле numeration обязательное' })
    @IsNumberString()
    numeration!: number;

    @Expose()
    @IsNotEmpty({ message: 'Поле albumId обязательное' })
    @IsNumberString()
    albumId!: number;

    @Expose()
    @IsNumberString()
    @IsNotEmpty()
    userId!: number;
}
