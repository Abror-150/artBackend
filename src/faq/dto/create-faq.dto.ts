import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({
    description: 'Savol matni',
    example: 'How can I reset my password?',
  })
  @IsString()
  @IsNotEmpty({ message: "Question maydoni bo'sh bo'lishi mumkin emas" })
  question: string;

  @ApiProperty({
    description: 'Javob matni',
    example:
      'You can reset your password by clicking on "Forgot password" link.',
  })
  @IsString()
  @IsNotEmpty({ message: "Answer maydoni bo'sh bo'lishi mumkin emas" })
  answer: string;
}
