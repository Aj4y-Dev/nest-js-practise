### some steps to start project in nestjs

Step 1: Install Nest CLI

First, make sure you have Node.js installed.

```
npm i -g @nestjs/cli

Check installation:
nest --version

to create a new project:
nest new projectName
```

commands demonstrate one of the main advantages of NestJS: the CLI generates boilerplate code and wires everything together for you.

```
in place of g we can use generate like nest generate module user

nest g module user
CREATE src/user/user.module.ts (85 bytes)
UPDATE src/app.module.ts (318 bytes)

nest g controller user
CREATE src/user/user.controller.ts (101 bytes)
CREATE src/user/user.controller.spec.ts (496 bytes)
UPDATE src/user/user.module.ts (170 bytes)

nest g service user
CREATE src/user/user.service.ts (92 bytes)
CREATE src/user/user.service.spec.ts (464 bytes)
UPDATE src/user/user.module.ts (244 bytes)
```

The CLI does all of that automatically, reducing repetitive work and helping keep every feature organized in the same way. This consistency is one of the reasons NestJS is popular for medium and large backend applications.

Rule: Always define static routes before dynamic routes.

Example:

```
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {

  @Get(':id')
  getUser(@Param('id') id: string) {
    return `User ID: ${id}`;
  }

  @Get('profile')
  getProfile() {
    return 'User Profile';
  }
}

Now you visit:
GET /users/profile

What happens?

Nest checks the routes in the order they were registered.

The first matching route is: /users/:id

Here: :id = "profile"

So the response becomes: User ID: profile

Your getProfile() method is never called.
```

@Param() is used to extract route parameters.

```
URL: GET /users/10
Here, 10 is part of the URL path.

Express
app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
});

NestJS
@Get(":id")
getUser(@Param("id") id: string) {
  return id;
}
```

Queries are not part of the route.

```
GET /movies?page=2&limit=10&search=batman
Everything after ? is the query string.

Express
req.query.page
req.query.limit

Nest
@Get()
findMovies(
    @Query("page") page: string,
    @Query("limit") limit: string
) {
    return { page, limit };
}
```

@Body() is usually used in POST, PUT, or PATCH requests.

```
POST /users
{
  "name":"Ajay",
  "email":"ajay@gmail.com"
}

Express
req.body.name

Nest
@Post()
createUser(@Body() body: any) {
    return body;
}
```

#### DTO (Data Transfer Object)

This is one of the biggest differences from Express.A DTO defines the shape of the data that should be received or sent.Think of it as a blueprint.

Suppose users must send:

```
{
    "name":"Ajay",
    "email":"abc@gmail.com",
    "age":20
}
```

Instead of using any, create a DTO.

```
export class CreateUserDto {
    name: string;
    email: string;
    age: number;
}

Controller
@Post()
createUser(@Body() dto: CreateUserDto) {
    return dto;
}
```

Now TypeScript knows:

- name is a string
- email is a string
- age is a number

You get autocomplete and type checking.

##### Why use a Class instead of an Interface? #imp

This is one of the most frequently asked TypeScript questions.

```
Interface
interface User {
    name: string;
}

During compilation:
TypeScript
↓
JavaScript

The interface is removed completely.
Generated JavaScript:// nothing

Interfaces exist only at compile time.
```

```
Class
class User {
    name: string;
}

Compiles to JavaScript:
class User {}

The class still exists at runtime.
```

###### Why does Nest need a class?

Nest uses decorators like: @IsEmail()

Decorators need a real JavaScript object at runtime. Interfaces disappear. Classes don't.

So Nest can inspect:

```
class CreateUserDto {
    @IsEmail()
    email: string;
}

at runtime and perform validation.
```

Interfac e=> Compile Time:✅ Exists, Runtime: ❌ Gone

Class => Compile Time: ✅ Exists, Runtime: ✅ Exists

#### DTO + Validation

DTOs become even more useful with class-validator.

```
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
}

If someone sends
{
   "name":123,
   "email":"hello"
}

Nest can automatically reject it with a validation error (when a ValidationPipe is enabled).
```

### PartialType

Suppose you already have:

```
export class CreateUserDto {
    name: string;
    email: string;
    password: string;
}

For creating a user:
{
   "name":"Ajay",
   "email":"abc@gmail.com",
   "password":"123456"
}
All fields are required.
```

Now imagine updating a user.
You may only want to update the email.

```
If you reuse CreateUserDto, TypeScript expects:
{
    "name":"...",
    "email":"...",
    "password":"..."
}

That doesn't fit a partial update.
```

Without PartialType

You would write:

```
export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
}

Notice every property is optional.

Nest provides a shortcut:

import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserDto extends PartialType(CreateUserDto) {}

This automatically creates a new DTO where every property from CreateUserDto becomes optional.

It's equivalent to:
export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
}

without rewriting all the fields.
```
