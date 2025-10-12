import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateArtworkDto {
  @ApiProperty({
    example: 'Ko‘hna shahar manzarasi',
    description: 'Asarning nomi',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Bu asarda qadimiy shahar manzarasi aks etgan.',
    description: 'Asar haqida qisqacha tavsif',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

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
    example: 'Portret',
    description: 'Asarning turi (masalan: Portret, Manzara, Abstrakt)',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
}
