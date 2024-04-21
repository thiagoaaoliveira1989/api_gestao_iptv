import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseServerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  constructor(id: string, name: string, price: Prisma.Decimal) {
    this.id = id;
    this.name = name;
    this.price = parseFloat(price.toString());
  }
}
