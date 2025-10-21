import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCommentDto) {
    const existsArtWork = await this.prisma.artwork.findFirst({
      where: { id: data.artworkId },
    });
    if (!existsArtWork) {
      throw new BadRequestException('artWork id topilmadi');
    }
    let created = await this.prisma.comment.create({ data });

    return created;
  }

  async findAll() {
    let data = await this.prisma.comment.findMany({
      include: {
        artwork: {
          include: {
            orderItem: {
              include: {
                order: true,
              },
            },
          },
        },
      },
    });
    return data;
  }

  async findOne(id: string) {
    let one = await this.prisma.comment.findFirst({ where: { id } });
    if (!one) {
      throw new NotFoundException('comment topilmadi');
    }
    return one;
  }

  async update(id: string, data: UpdateCommentDto) {
    await this.findOne(id);
    let updated = await this.prisma.comment.update({ where: { id }, data });
    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);
    let deleted = await this.prisma.comment.delete({ where: { id } });
    return deleted;
  }
}
