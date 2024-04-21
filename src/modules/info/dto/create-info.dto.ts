import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum StatusEnum {
  BLOQUEADO = 0,
  ATIVADO = 1,
  EXPIRADO = 2,
  PENDENTE = 3,
}

export class CreateInfoDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  expirationDate?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  monthlyFeeValue: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  appName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  deviceKey?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  paymentStatus: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  clientStatus: StatusEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  numberOfScreens: number;
}
