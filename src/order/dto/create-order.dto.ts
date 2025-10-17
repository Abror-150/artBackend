import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty({ example: 'a1b2c3d4', description: 'Artwork ID' })
  @IsNotEmpty()
  @IsString()
  artworkId: string;

  @ApiProperty({ example: 2, description: 'Buyurtma miqdori' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'Alex', description: 'Mijozning to‘liq ismi' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqam' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'Toshkent, Yunusobod',
    description: 'Yetkazib berish manzili',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    type: [OrderItemDto],
    description: 'Buyurtmadagi rasm(lar) ro‘yxati',
    example: [{ artworkId: 'a1b2c3', quantity: 1 }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
