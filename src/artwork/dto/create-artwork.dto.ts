import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateArtworkDto {
  @ApiProperty({
    example: 'Ko‘hna shahar manzarasi',
    description: 'Asarning nomi (o‘zbekcha)',
  })
  @IsString()
  title_uz: string;

  @ApiProperty({
    example: 'Старинный городской пейзаж',
    description: 'Название произведения (ruscha)',
  })
  @IsString()
  title_ru: string;

  @ApiProperty({
    example: 'Ancient city landscape',
    description: 'Artwork title (english)',
  })
  @IsString()
  title_en: string;

  @ApiProperty({
    example: 'Bu asarda qadimiy shahar manzarasi aks etgan.',
    description: 'Asar haqida qisqacha tavsif (o‘zbekcha)',
    required: false,
  })
  @IsOptional()
  @IsString()
  description_uz?: string;

  @ApiProperty({
    example: 'На этой картине изображен древний городской пейзаж.',
    description: 'Описание произведения (ruscha)',
    required: false,
  })
  @IsOptional()
  @IsString()
  description_ru?: string;

  @ApiProperty({
    example: 'This artwork shows an ancient city landscape.',
    description: 'Artwork description (english)',
    required: false,
  })
  @IsOptional()
  @IsString()
  description_en?: string;

  @ApiProperty({
    example: 250000.0,
    description: 'Asarning narxi',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'https://example.com/images/artwork1.jpg',
    description: 'Asarning rasmi joylashgan URL manzili',
  })
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    example: 'Manzara',
    description: 'Asarning turi (masalan: Portret, Manzara, Abstrakt)',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
}
