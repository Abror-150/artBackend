import { PartialType } from '@nestjs/swagger';
import { CreateArtworkDto } from './create-artwork.dto';
import { IsOptional, IsString, IsNumber, IsObject } from 'class-validator';

export class UpdateArtworkDto extends PartialType(CreateArtworkDto) {
  @IsOptional()
  @IsObject()
  title?: {
    uz?: string;
    ru?: string;
    en?: string;
  };

  @IsOptional()
  @IsObject()
  description?: {
    uz?: string;
    ru?: string;
    en?: string;
  };

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
