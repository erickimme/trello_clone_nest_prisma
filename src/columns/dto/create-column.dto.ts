// trello_clone_nest_prisma/src/columns/dto/create-column.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
export class CreateColumnDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly order: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  readonly boardId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
