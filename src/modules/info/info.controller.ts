import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInfoDto } from './dto/response-info-dto';
import { CreateInfoDto } from './dto/create-info.dto';

@Controller('info')
@ApiTags('Detalhes do Usuário')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @ApiResponse({
    status: 201,
    description: 'Informações do Usuário criadas com sucesso',
    type: ResponseInfoDto,
  })
  @Post(':userId/:serverId')
  async create(
    @Body() createInfoDto: CreateInfoDto,
    @Param('userId') userId: string,
    @Param('serverId') serverId: string,
  ): Promise<ResponseInfoDto> {
    return await this.infoService.create(createInfoDto, userId, serverId);
  }

  @Get()
  async findAll(): Promise<ResponseInfoDto[]> {
    return await this.infoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseInfoDto> {
    return await this.infoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInfoDto: UpdateInfoDto,
  ): Promise<ResponseInfoDto> {
    return await this.infoService.update(id, updateInfoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ [key: string]: any }> {
    return await this.infoService.remove(id);
  }
}
