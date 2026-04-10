import { Injectable, NotFoundException } from '@nestjs/common';
import { USERS, UserRecord } from '../store-data';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  findAll(): User[] {
    return USERS.map((user) => this.mapToEntity(user));
  }

  findOne(id: string): User | undefined {
    const user = USERS.find((item) => item.id === id);
    return user ? this.mapToEntity(user) : undefined;
  }

  findOneOrFail(id: string): User {
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id "${id}" no encontrado`);
    }
    return user;
  }

  private mapToEntity(user: UserRecord): User {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      lastVisit: user.lastVisit,
      createdAt: user.createdAt,
      reviews: [],
      orders: [],
    };
  }
}
