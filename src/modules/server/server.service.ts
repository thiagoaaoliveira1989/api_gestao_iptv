import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseServerDto } from './dto/response-server-dto';
import { Server } from './entities/server.entity';

@Injectable()
export class ServerService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateServerDto): Promise<ResponseServerDto> {
    console.log(payload.name);
    console.log(payload.price);

    const server = new Server();
    Object.assign(server, payload);
    const newServer = await this.prisma.server.create({ data: server });
    return new ResponseServerDto(newServer.id, newServer.name, newServer.price);
  }

  async findAll(): Promise<ResponseServerDto[]> {
    const servers = await this.prisma.server.findMany({});
    return servers.map(
      (server) => new ResponseServerDto(server.id, server.name, server.price),
    );
  }

  async findOne(id: string): Promise<ResponseServerDto | null> {
    const server = await this.prisma.server.findFirst({
      where: { id },
    });
    if (!server) return null;
    return new ResponseServerDto(server.id, server.name, server.price);
  }

  async update(
    id: string,
    payload: UpdateServerDto,
  ): Promise<ResponseServerDto | null> {
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

  async remove(id: string): Promise<void> {
    await this.prisma.server.delete({ where: { id } });
  }
}
