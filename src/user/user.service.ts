import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}
  private users: User[] = [
    { id: 1, name: 'Ram', email: 'ram@example.com' },
    { id: 2, name: 'Ajay', email: 'ajay@example.com' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log('Finding all users');

    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findOneUser(id: number) {
    this.logger.log(`Finding user with id: ${id}`);
    const user = this.users.find((user) => user.id === id) ?? null;

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(dto: CreateUserDto) {
    this.logger.log('Creating User');
    const newUser: User = { id: this.users.length + 1, email: '', ...dto };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log(`Updating user with id: ${id}`);

    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }

    this.users[index] = { ...this.users[index], ...dto };

    return this.users[index];
  }

  deleteUser(id: number) {
    this.logger.log(`Deleting user with id: ${id}`);

    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }

    const deletedUser = this.users.splice(index, 1);
    return deletedUser[0];
  }
}

// UserController -> needs UserService -> needs LoggerService
// Nest -> creates and connects everything automatically. This is called Dependency Injection (DI)
