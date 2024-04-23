import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseInfoDto } from './dto/response-info-dto';
import { detectDateFormat } from 'src/libs/functionsConverts';

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}

  async create(
    payload: CreateInfoDto,
    userId: string,
    serverId: string,
  ): Promise<ResponseInfoDto> {
    const { expirationDate } = payload;

    const normalizedServerDeviceId = payload.deviceId.toLowerCase();

    const foundInfoDeviceId = await this.prisma.info.findFirst({
      where: { deviceId: normalizedServerDeviceId },
    });

    if (foundInfoDeviceId) {
      throw new HttpException(
        'DeviceId já cadastrado em nossa base',
        HttpStatus.CONFLICT,
      );
    }

    const dateFomated = detectDateFormat(expirationDate);

    const data = { ...payload, userId, serverId };

    const newInfo = await this.prisma.info.create({
      data: {
        monthlyFeeValue: data.monthlyFeeValue,
        paymentStatus: data.paymentStatus,
        clientStatus: data.clientStatus,
        numberOfScreens: data.numberOfScreens,
        serverId: data.serverId,
        userId: data.userId,
        expirationDate: dateFomated,
        appName: data.appName,
        deviceId: normalizedServerDeviceId,
        deviceKey: data.deviceKey,
      },
    });

    return new ResponseInfoDto(
      newInfo.id,
      newInfo.monthlyFeeValue,
      newInfo.paymentStatus,
      newInfo.clientStatus,
      newInfo.numberOfScreens,
      newInfo.serverId,
      newInfo.userId,
      newInfo.creationDate,
      newInfo.expirationDate,
      newInfo.appName,
      newInfo.deviceId,
      newInfo.deviceKey,
    );
  }

  async findAll(): Promise<ResponseInfoDto[]> {
    const infos = await this.prisma.info.findMany({});

    if (!infos || infos.length === 0) {
      return [];
    }

    return infos.map(
      (info) =>
        new ResponseInfoDto(
          info.id,
          info.monthlyFeeValue,
          info.paymentStatus,
          info.clientStatus,
          info.numberOfScreens,
          info.serverId,
          info.userId,
          info.creationDate,
          info.expirationDate,
          info.appName,
          info.deviceId,
          info.deviceKey,
        ),
    );
  }

  async findOne(id: string): Promise<ResponseInfoDto> {
    const info = await this.prisma.info.findFirst({
      where: { id },
    });

    if (!info) {
      throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND);
    }

    return new ResponseInfoDto(
      info.id,
      info.monthlyFeeValue,
      info.paymentStatus,
      info.clientStatus,
      info.numberOfScreens,
      info.serverId,
      info.userId,
      info.creationDate,
      info.expirationDate,
      info.appName,
      info.deviceId,
      info.deviceKey,
    );
  }

  async update(id: string, payload: UpdateInfoDto): Promise<ResponseInfoDto> {
    const info = await this.prisma.info.findFirst({
      where: { id },
    });

    if (!info) {
      throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND);
    }

    const updatedInfo = await this.prisma.info.update({
      where: { id },
      data: {
        expirationDate: payload.expirationDate,
        monthlyFeeValue: payload.monthlyFeeValue,
        appName: payload.appName,
        deviceId: payload.deviceId,
        deviceKey: payload.deviceKey,
        paymentStatus: payload.paymentStatus,
        clientStatus: payload.clientStatus,
        numberOfScreens: payload.numberOfScreens,
      },
    });
    return new ResponseInfoDto(
      updatedInfo.id,
      updatedInfo.monthlyFeeValue,
      updatedInfo.paymentStatus,
      updatedInfo.clientStatus,
      updatedInfo.numberOfScreens,
      updatedInfo.serverId,
      updatedInfo.userId,
      updatedInfo.creationDate,
      updatedInfo.expirationDate,
      updatedInfo.appName,
      updatedInfo.deviceId,
      updatedInfo.deviceKey,
    );
  }

  async remove(id: string): Promise<{ [key: string]: any }> {
    const info = await this.prisma.info.findFirst({
      where: { id },
    });

    if (!info) {
      throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.prisma.info.delete({ where: { id } });

    return {};
  }
}
