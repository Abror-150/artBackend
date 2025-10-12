import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload/upload.controller';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [OrderModule, PrismaModule],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}





