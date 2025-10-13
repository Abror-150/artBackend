import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateContactDto) {
    const created = await this.prisma.contact.create({ data });
    return created;
  }

  async findAll() {
    const data = await this.prisma.contact.findMany();
    return data;
  }

  async findOne(id: string) {
    const one = await this.prisma.contact.findFirst({ where: { id } });
    if (!one) {
      throw new NotFoundException('contact topilmadi');
    }
    return one;
  }

  async update(id: string, data: UpdateContactDto) {
    await this.findOne(id);
    let updated = await this.prisma.contact.update({ where: { id }, data });
    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);
    let deleted = await this.prisma.contact.delete({ where: { id } });
    return deleted;
  }
}
