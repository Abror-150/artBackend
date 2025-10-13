import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'Foydalanuvchi ismi' })
  @IsString()
  @IsNotEmpty({ message: "Name maydoni bo'sh bo'lishi mumkin emas" })
  name: string;

  @ApiPropertyOptional({ description: 'Foydalanuvchi emaili' })
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  email?: string;

  @ApiProperty({ description: 'Izoh matni' })
  @IsString()
  @IsNotEmpty({ message: "Message maydoni bo'sh bo'lishi mumkin emas" })
  message: string;

  @ApiProperty({ description: 'Sanat asari IDsi' })
  @IsString()
  @IsNotEmpty({ message: "ArtworkId maydoni bo'sh bo'lishi mumkin emas" })
  artworkId: string;

  @ApiProperty({ description: 'Rating (1 dan 5 gacha)' })
  @IsNumber()
  @Min(1, { message: "Rating minimal 1 bo'lishi kerak" })
  @Max(5, { message: "Rating maksimal 5 bo'lishi kerak" })
  rating: number;
}
