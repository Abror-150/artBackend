import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    const artworks = await this.prisma.artwork.findMany({
      where: {
        id: { in: data.items.map((i) => i.artworkId) },
      },
      select: { id: true, price: true, title: true },
    });

    let totalPrice = 0;

    for (const item of data.items) {
      const artwork = artworks.find((a) => a.id === item.artworkId);
      if (artwork) {
        totalPrice += artwork.price * item.quantity;
      }
    }

    const exitingFind = await this.prisma.artwork.findFirst({
      where: { id: { in: data.items.map((id) => id.artworkId) } },
    });
    if (!exitingFind) {
      throw new BadRequestException('artWork id topilmadi');
    }
    const createOrder = await this.prisma.order.create({
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        totalPrice,

        orderItem: {
          create: data.items.map((item) => ({
            artworkId: item.artworkId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItem: {
          include: { artWork: true },
        },
      },
    });
    const BOT_TOKEN = '8202198108:AAHVOgeiLCJ2Y_SDUG-y_dB-kn8MVcEHJmA';
    const CHAT_ID = '-4967890265';
    const productList = artworks.map((a) => `🖼 ${a.title}`).join('\n');

    const message = `
    🆕 *Yangi buyurtma keldi!
    ━━━━━━━━━━━━━━
    👤 Ism: ${data.fullName}
    📞 Telefon: ${data.phoneNumber}
    📦 Mahsulot: ${productList}
    💰 Narxi: ${totalPrice} so'm
    📍 Manzil: ${data.address}
    ━━━━━━━━━━━━━━
    ⏰ Sana: ${new Date().toLocaleString('uz-UZ')}
        `;

    try {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      });
    } catch (err) {
      console.error('Telegramga xabar yuborishda xatolik:', err.message);
    }

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
