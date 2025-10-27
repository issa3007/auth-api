import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { Role, User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepo.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.usersRepo.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role ?? Role.USER,
    });

    return newUser;
  }

  async findByEmail(email: string) {
    return this.usersRepo.findByEmail(email);
  }

  async findAllUsers() {
    return this.usersRepo.findAll();
  }

  async findOneUser(id: number) {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.usersRepo.update(id, updateUserDto);
  }

  async removeUser(id: number) {
    const user = await this.usersRepo.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    await this.usersRepo.remove(id);
    return { message: 'User has been deleted successfully' };
  }
}
