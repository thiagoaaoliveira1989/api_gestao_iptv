import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ResponseUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @ApiProperty()
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
