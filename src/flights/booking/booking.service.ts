import { BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

import { Booking } from '../entities/booking.entity';
import { Flight } from '../entities/flight.entity';

import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingStatus } from './entities/booking.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
    ) {}

 async create(dto: CreateBookingDto, user: User): Promise<Booking> {
        // 1. El evento debe existir
        const event = await this.flightRepository.findOneBy({ id: dto.eventId });
        if (!event) {
            throw new EventNotFoundException(dto.eventId);
        }

        // 2. Debe estar activo
        if (!event.isActive) {
            throw new BadRequestException('La reserva no está activo');
        }

        // 3. No debe haber ocurrido
        if (event.date.getTime() <= Date.now()) {
            throw new BadRequestException('El evento ya ocurrió');
        }

        // 4. No exceder los cupos disponibles
        if (dto.seats > event.availableSeats) {
            throw new ConflictException(`Solo quedan ${event.availableSeats} cupo(s) disponible(s)`);
        }

        // 5. Máximo 5 cupos activos por usuario en el mismo evento
        const myActiveReservations = await this.bookingRepository.find({
            where: { user: { id: user.id }, flight: { id: Flight.id }, status: BookingStatus.ACTIVE },
        });
        const alreadyReserved = myActiveReservations.reduce((sum, r) => sum + r.seats, 0);
        if (alreadyReserved + dto.seats > MAX_ACTIVE_SPOTS_PER_USER_PER_FLIGHT) {
            throw new ConflictException(
                `Máximo ${MAX_ACTIVE_SPOTS_PER_USER_PER_FLIGTH} cupos activos por evento. Ya tienes ${alreadyReserved}`,
            );
        }

        // 6. Descontar asientos y guardar la reserva
        event.availableSeats -= dto.spots;
        await this.flightRepository.save(event);

        const saved = await this.bookingRepository.save(
            this.bookingRepository.create({ seats: dto.seats, user, event }),
        );

        // Se recarga sin la relación user para no devolver datos del usuario
        return await this.bookingRepository.findOneOrFail({
            where: { id: saved.id },
            relations: { flight: true },
        });
    }
}