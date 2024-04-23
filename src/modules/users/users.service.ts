import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto): Promise<ResponseUserDto> {
    const normalizedServerEmail = payload.email.toLowerCase();

    const foundUserEmail = await this.prisma.user.findFirst({
      where: { email: normalizedServerEmail },
    });

    if (foundUserEmail) {
      throw new HttpException(
        'Email já cadastrado em nossa base',
        HttpStatus.CONFLICT,
      );
    }

    const foundUserPhone = await this.prisma.user.findFirst({
      where: { phone: payload.phone },
    });

    if (foundUserPhone) {
      throw new HttpException(
        'Telefone já cadastrado em nossa base',
        HttpStatus.CONFLICT,
      );
    }

    const user = new User();
    user.name = payload.name;
    user.email = normalizedServerEmail;
    user.phone = payload.phone;

    return await this.prisma.user.create({ data: user });
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const foundUser = await this.prisma.user.findMany({});

    if (!foundUser || foundUser.length === 0) {
      return [];
    }

    return foundUser;
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const foundUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!foundUser) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  async update(id: string, payload: UpdateUserDto): Promise<ResponseUserDto> {
    const foundUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!foundUser) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
      },
    });
  }

  async remove(id: string): Promise<{ [key: string]: any }> {
    const foundUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!foundUser) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {};
  }
}
