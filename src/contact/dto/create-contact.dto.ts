import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Foydalanuvchi ismi',
    example: 'Abror Urazaliev',
  })
  @IsString()
  @IsNotEmpty({ message: "Name maydoni bo'sh bo'lishi mumkin emas" })
  name: string;

  @ApiProperty({
    description: 'Foydalanuvchi emaili',
    example: 'abror@example.com',
  })
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  @IsNotEmpty({ message: "Email maydoni bo'sh bo'lishi mumkin emas" })
  email: string;

  @ApiProperty({
    description: 'Xabar matni',
    example: "Salom, men siz bilan bog'lanmoqchiman.",
  })
  @IsString()
  @IsNotEmpty({ message: "Message maydoni bo'sh bo'lishi mumkin emas" })
  message: string;
}
