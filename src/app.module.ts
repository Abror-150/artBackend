import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload/upload.controller';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArtworkModule } from './artwork/artwork.module';
import { CommentModule } from './comment/comment.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [OrderModule, PrismaModule, ArtworkModule, CommentModule, ContactModule, FaqModule],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}





