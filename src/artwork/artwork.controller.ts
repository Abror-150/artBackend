import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('artwork')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @Post()
  create(@Body() createArtworkDto: CreateArtworkDto) {
    return this.artworkService.create(createArtworkDto);
  }
  @Get()
  @ApiOperation({
    summary: 'Barcha asarlarni olish (pagination, filter bilan)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Sahifa raqami',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Har sahifadagi elementlar soni',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Asar nomi yoki tavsifida qidirish',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Kategoriya bo‘yicha filter',
  })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.artworkService.findAll({
      page: Number(page),
      limit: Number(limit),
      search,
      category,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artworkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtworkDto: UpdateArtworkDto) {
    return this.artworkService.update(id, updateArtworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artworkService.remove(id);
  }
}
