import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

@Injectable()
export class ArtworkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtworkDto: CreateArtworkDto) {
    try {
      const artwork = await this.prisma.artwork.create({
        data: createArtworkDto,
      });
      return {
        success: true,
        message: 'Artwork successfully created',
        data: artwork,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create artwork');
    }
  }

  async findAll(query: {
    page?: number | string;
    limit?: number | string;
    search?: string;
    category?: string;
  }) {
    try {
      // --- Parametrlarni tozalaymiz
      const page = Number(query.page) > 0 ? Number(query.page) : 1;
      const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
      const skip = (page - 1) * limit;

      const where: any = {};

      // --- Qidiruv (search)
      if (query.search) {
        where.OR = [
          { title: { contains: query.search, mode: 'insensitive' } },
          { description: { contains: query.search, mode: 'insensitive' } },
        ];
      }

      // --- Kategoriya bo‘yicha filtr
      if (query.category) {
        where.category = { equals: query.category, mode: 'insensitive' };
      }

      // --- Ma'lumotlarni olish
      const [artworks, total] = await Promise.all([
        this.prisma.artwork.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.artwork.count({ where }),
      ]);

      // --- Natijani qaytarish
      return {
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: artworks,
      };
    } catch (error) {
      console.error('❌ Artwork fetch error:', error);

      // Agar bu Prisma xatosi bo‘lsa, foydalanuvchiga tushunarli javob beramiz
      return {
        success: false,
        message: error.message || 'Failed to fetch artworks',
        data: [],
      };
    }
  }

  async findOne(id: string) {
    try {
      const artwork = await this.prisma.artwork.findUnique({
        where: { id },
        include: { comments: true },
      });
      if (!artwork) {
        throw new NotFoundException(`Artwork with ID ${id} not found`);
      }
      return {
        success: true,
        data: artwork,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch artwork');
    }
  }

  async update(id: string, updateArtworkDto: UpdateArtworkDto) {
    try {
      const existing = await this.prisma.artwork.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Artwork with ID ${id} not found`);
      }

      const updated = await this.prisma.artwork.update({
        where: { id },
        data: updateArtworkDto,
      });

      return {
        success: true,
        message: 'Artwork successfully updated',
        data: updated,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update artwork');
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.artwork.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Artwork with ID ${id} not found`);
      }

      await this.prisma.artwork.delete({ where: { id } });
      return {
        success: true,
        message: 'Artwork successfully deleted',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete artwork');
    }
  }
}
