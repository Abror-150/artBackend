import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFaqDto) {
    return this.prisma.faq.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.faq.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const faq = await this.prisma.faq.findUnique({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`Faq with id ${id} not found`);
    }
    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    await this.findOne(id);
    return this.prisma.faq.update({
      where: { id },
      data: updateFaqDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.faq.delete({ where: { id } });
  }
}
