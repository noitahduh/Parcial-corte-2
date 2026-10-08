import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightgDto } from './dto/update-flight.dto';

import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
    constructor(private readonly flightService: FlightService) {}

    // TODO: Implement endpoints according to the exam specifications
}
