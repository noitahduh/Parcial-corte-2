import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { Flight } from '../entities/flight.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
    ) {}

    // TODO: Implement business logic methods according to the exam specifications
}
