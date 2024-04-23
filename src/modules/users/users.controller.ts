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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';

@Controller('users')
@ApiTags('Usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    type: ResponseUserDto,
    status: 201,
    description: 'Criar Usuario',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return await this.usersService.create(createUserDto);
  }

  @ApiResponse({
    type: [ResponseUserDto],
    status: 200,
    description: 'Buscar todos os Usuarios',
  })
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    return await this.usersService.findAll();
  }

  @ApiResponse({
    type: [ResponseUserDto],
    status: 200,
    description: 'Buscar Usuario',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return await this.usersService.findOne(id);
  }

  @ApiResponse({
    type: [ResponseUserDto],
    status: 200,
    description: 'Atualizar Usuario',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({
    description: 'Deletar Usuario',
    status: 204,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ [key: string]: any }> {
    return await this.usersService.remove(id);
  }
}
