import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseInfoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  creationDate?: Date;

  @ApiProperty()
  expirationDate?: Date;

  @ApiProperty()
  monthlyFeeValue: number;

  @ApiProperty()
  appName?: string;

  @ApiProperty()
  deviceId?: string;

  @ApiProperty()
  deviceKey?: string;

  @ApiProperty()
  paymentStatus: boolean;

  @ApiProperty()
  clientStatus: number;

  @ApiProperty()
  numberOfScreens: number;

  @ApiProperty()
  serverId: string;

  @ApiProperty()
  userId: string;

  constructor(
    id: string,
    monthlyFeeValue: Prisma.Decimal,
    paymentStatus: boolean,
    clientStatus: number,
    numberOfScreens: number,
    serverId: string,
    userId: string,
    creationDate?: Date,
    expirationDate?: Date,
    appName?: string,
    deviceId?: string,
    deviceKey?: string,
  ) {
    this.id = id;
    this.creationDate = creationDate ?? new Date();
    this.expirationDate = expirationDate;
    this.monthlyFeeValue = parseFloat(monthlyFeeValue.toString());
    this.appName = appName;
    this.deviceId = deviceId;
    this.deviceKey = deviceKey;
    this.paymentStatus = paymentStatus;
    this.clientStatus = clientStatus;
    this.numberOfScreens = numberOfScreens;
    this.serverId = serverId;
    this.userId = userId;
  }
}
