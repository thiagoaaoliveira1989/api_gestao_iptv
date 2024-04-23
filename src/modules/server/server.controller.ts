import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
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

  @ApiResponse({
    type: ResponseServerDto,
    status: 201,
    description: 'Criar Servidor',
  })
  @Post()
  async create(@Body() payload: CreateServerDto): Promise<ResponseServerDto> {
    return await this.serverService.create(payload);
  }

  @ApiResponse({
    type: [ResponseServerDto],
    status: 200,
    description: 'Buscar todos os Servidores',
  })
  @Get()
  findAll() {
    return this.serverService.findAll();
  }

  @ApiResponse({
    type: ResponseServerDto,
    status: 200,
    description: 'Buscar Servidor',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(id);
  }

  @ApiResponse({
    type: ResponseServerDto,
    status: 200,
    description: 'Atualizar Servidor',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
    return this.serverService.update(id, updateServerDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ [key: string]: any }> {
    return this.serverService.remove(id);
  }
}
