import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    let createOrder = await this.prisma.order.create({ data });
    return createOrder;
  }
  async findAll() {
    let data = await this.prisma.order.findMany();
    return data;
  }

  async findOne(id: string) {
    let one = await this.prisma.order.findFirst({ where: { id } });
    if (!one) {
      throw new NotFoundException('order topilmadi');
    }
  }

  async update(id: string, data: UpdateOrderDto) {
    await this.findOne(id);
    let updated = await this.prisma.order.update({ where: { id }, data });
    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);
    let deleted = await this.prisma.order.delete({ where: { id } });
    return deleted;
  }
}
