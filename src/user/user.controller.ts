import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { RoleGuard } from 'src/guards/role.guard';

// @Get('all')       //GET /user/all
// @Get(':id')       //GET /user/:id - dynamic segment
// @Post()          //POST /user
// @Post(':id')     //POST /user/:id
// @Delete(':id')   //DELETE /user/:id
// Rule: Always define static routes before dynamic routes.
// Otherwise, a dynamic route can accidentally match a request meant for a static route.

@Controller('user') // this mean /user of route
export class UserController {
  constructor(private readonly userService: UserService) {}

  //GET /user
  @Get()
  getUser(@Query('name') name: string): unknown {
    return this.userService.findAllUsers(name);
  }

  //GET by id /user/id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneUser(id);
  }

  //POST /user
  @Post()
  createuser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }

  //PUT /user/:id
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.updateUser(Number(id), UpdateUserDto);
  }

  //DELETE /user/:id
  @Delete(':id')
  @UseGuards(RoleGuard)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
