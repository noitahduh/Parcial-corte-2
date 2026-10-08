import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../entities/flight.entity';

@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
    ) {}

    // TODO: Implement business logic methods according to the exam specifications
}
