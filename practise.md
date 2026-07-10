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
