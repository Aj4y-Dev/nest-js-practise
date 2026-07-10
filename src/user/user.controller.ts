import { Controller, Get, Param, Query } from '@nestjs/common';

// @Get('all')       //GET /user/all
// @Get(':id')       //GET /user/:id - dynamic segment
// @Post()          //POST /user
// @Post(':id')     //POST /user/:id
// @Delete(':id')   //DELETE /user/:id
// Rule: Always define static routes before dynamic routes.
// Otherwise, a dynamic route can accidentally match a request meant for a static route.

@Controller('user') // this mean /user of route
export class UserController {
  //GET /user
  @Get()
  getUser(@Query('name') name: string) {
    const users = [
      { id: 1, name: 'Ram' },
      { id: 2, name: 'Ajay' },
    ];

    if (name) {
      return users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
  }

  //GET by id /user/id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return { id, name: 'Ajay' };
  }
}
