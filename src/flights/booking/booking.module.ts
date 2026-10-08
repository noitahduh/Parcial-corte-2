import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { Flight } from '../entities/flight.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
    imports: [TypeOrmModule.forFeature([Booking, Flight])],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService, TypeOrmModule],
})
export class BookingModule {}
