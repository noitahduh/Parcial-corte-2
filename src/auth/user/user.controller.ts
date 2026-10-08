import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type Response } from 'express';

import { PermissionsGuard } from '@/common/guards/permissions.guard';
import { Permissions } from '@/common/decorators/permissions.decorator';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserParams } from './dto/get-user-params.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(200)
    @Permissions('read')
    findAll(@Query('username') username?: string) {
        return this.userService.findAll(username);
    }

    @Post()
    @HttpCode(201)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    update(@Param() param: GetUserParams, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(param.id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        const result = await this.userService.remove(+id);
        if (result) {
            return res.status(200).json(`User with id ${id} deleted successfully`);
        }
        return res.status(404).json(`User with id ${id} not found`);
    }
}
