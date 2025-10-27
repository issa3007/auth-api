import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/jwt-roles.guards';
import { Role } from './entities/user.entity';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users (admin only)' })
  async findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id (admin or owner only)' })
  async findOne(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    const requester = req.user;

    if (requester.role !== Role.ADMIN && requester.id !== id) {
      throw new ForbiddenException('You are not allowed to view this user');
    }

    return this.usersService.findOneUser(id);
  }
}
