import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightgDto } from './dto/update-flight.dto';

import { Flight } from '../entities/flight.entity';
import { Booking } from '../entities/booking.entity';


@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
    ) {}

async create(dto: CreateFlightDto): Promise<Booking> {
        const event = this.flightRepository.create({ ...dto, date: new Date(dto.date), availableSpots: dto.capacity });
        return await this.flightRepository.save(Flight);
    }
}