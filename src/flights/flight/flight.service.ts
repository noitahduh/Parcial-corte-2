import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

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

async findAll(): Promise<Flight[]> {
        return await this.flightRepository.find({ order: { date: 'ASC' } });
    }

    async findOne(id: number): Promise<Flight> {
        const event = await this.flightRepository.findOneBy({ id });
        if (!event) {
            throw new FlightNotFoundException(id);
        }
        return event;
    }

    async update(id: number, dto: UpdateFlightDto): Promise<Event> {
        await this.findOne(id);
        await this.flightRepository.update(id, dto);
        return this.findOne(id);
    }

    async deactivate(id: number): Promise<Flightt> {
        const event = await this.findOne(id);
        event.isActive = false;
        return await this.flightRepository.save(event);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.flightRepository.delete(id);
    }
    }
