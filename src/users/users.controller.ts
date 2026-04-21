import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ type: [User], description: 'Array of all users' })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({ name: 'id', description: 'User CUID', example: 'clx1abc2300001' })
  @ApiOkResponse({ type: User, description: 'The requested user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneOrFail(id);
  }
}
