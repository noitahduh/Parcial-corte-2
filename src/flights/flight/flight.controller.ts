import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
    constructor(private readonly flightService: FlightService) {}

@Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_flight')
    create(@Body() dto: CreateFlightDto) {
        return this.flightService.create(dto);
    }

    @Get()
    @Permissions('read_flight')
    findAll() {
        return this.flightService.findAll();
    }

    @Get(':id')
    @Permissions('read_flitgh')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.flitghService.findOne(id);
    }

    @Patch(':id')
    @Permissions('update_flight')
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateflightDto) {
        return this.flightService.update(id, dto);
    }

    @Patch(':id/deactivate')
    @Permissions('deactivate_flight')
    deactivate(@Param('id', PositiveIntPipe) id: number) {
        return this.flightService.deactivate(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions('delete_flight')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.flightService.remove(id);
    }
}
