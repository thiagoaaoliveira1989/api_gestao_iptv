import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServerService } from './server.service';
import { UpdateServerDto } from './dto/update-server.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseServerDto } from './dto/response-server-dto';
import { CreateServerDto } from './dto/create-server.dto';

@Controller('server')
@ApiTags('Servidor')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @ApiResponse({ type: ResponseServerDto })
  @Post()
  async create(@Body() payload: CreateServerDto): Promise<ResponseServerDto> {
    return await this.serverService.create(payload);
  }
  @Get()
  findAll() {
    return this.serverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverService.update(id, updateServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverService.remove(id);
  }
}
