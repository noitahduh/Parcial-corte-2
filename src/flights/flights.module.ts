import { Module } from '@nestjs/common';
import { FlightModule } from './flight/flight.module';
import { BookingModule } from './booking/booking.module';

@Module({
    imports: [FlightModule, BookingModule],
    exports: [FlightModule, BookingModule],
})
export class FlightsModule {}
