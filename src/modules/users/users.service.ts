import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto): Promise<ResponseUserDto> {
    const user = new User();
    Object.assign(user, payload);
    return await this.prisma.user.create({ data: user });
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async update(id: string, payload: UpdateUserDto): Promise<ResponseUserDto> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
