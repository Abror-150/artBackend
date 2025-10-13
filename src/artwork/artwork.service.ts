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
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) {
    try {
      const { page = 1, limit = 10, search, category } = query;

      const skip = (page - 1) * limit;

      const where: any = {};

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (category) {
        where.category = { equals: category, mode: 'insensitive' };
      }

      const [artworks, total] = await Promise.all([
        this.prisma.artwork.findMany({
          where,
          include: { comments: true },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.artwork.count({ where }),
      ]);

      return {
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: artworks,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch artworks');
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
