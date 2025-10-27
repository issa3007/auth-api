import { Role } from 'src/users/entities/user.entity';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ minLength: 5 })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @ApiProperty({ required: false, enum: Role, default: Role.USER })
  @IsOptional()
  role?: Role;
}
