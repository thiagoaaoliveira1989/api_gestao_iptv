import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseServerDto } from './dto/response-server-dto';
import { Server } from './entities/server.entity';

@Injectable()
export class ServerService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateServerDto): Promise<ResponseServerDto> {
    const normalizedServerName = payload.name.toLowerCase(); // Normaliza para minúsculas

    const foundServer = await this.prisma.server.findFirst({
      where: { name: normalizedServerName },
    });

    if (foundServer) {
      throw new HttpException('Servidor já cadastrado', HttpStatus.CONFLICT);
    }

    const server = new Server();
    server.name = normalizedServerName; // Armazena o nome normalizado
    server.price = payload.price;

    const newServer = await this.prisma.server.create({ data: server });

    return new ResponseServerDto(newServer.id, newServer.name, newServer.price);
  }

  async findAll(): Promise<ResponseServerDto[]> {
    const foundServer = await this.prisma.server.findMany({});

    if (!foundServer || foundServer.length === 0) {
      return [];
    }
    return foundServer.map(
      (server) => new ResponseServerDto(server.id, server.name, server.price),
    );
  }

  async findOne(id: string): Promise<ResponseServerDto> {
    const foundServer = await this.prisma.server.findFirst({
      where: { id },
    });
    if (!foundServer) {
      throw new HttpException('Servidor não encontrado', HttpStatus.NOT_FOUND);
    }

    return new ResponseServerDto(
      foundServer.id,
      foundServer.name,
      foundServer.price,
    );
  }

  async update(
    id: string,
    payload: UpdateServerDto,
  ): Promise<ResponseServerDto | null> {
    const foundServer = await this.prisma.server.findFirst({
      where: { id },
    });
    if (!foundServer) {
      throw new HttpException('Servidor não encontrado', HttpStatus.NOT_FOUND);
    }

    const updatedServer = await this.prisma.server.update({
      where: { id },
      data: {
        name: payload.name,
        price: payload.price,
      },
    });
    if (!updatedServer) return null;
    return new ResponseServerDto(
      updatedServer.id,
      updatedServer.name,
      updatedServer.price,
    );
  }

  async remove(id: string): Promise<{ [key: string]: any }> {
    const foundServer = await this.prisma.server.findFirst({
      where: { id },
    });
    if (!foundServer) {
      throw new HttpException('Servidor não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.prisma.server.delete({ where: { id } });
    return {};
  }
}
