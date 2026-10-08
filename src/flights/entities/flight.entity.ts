import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';

export enum FlightStatus {
    SCHEDULED = 'SCHEDULED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

@Entity('flights')
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'flight_number', type: 'varchar', length: 20 })
    flightNumber: string;

    @Column({ type: 'varchar', length: 10 })
    origin: string;

    @Column({ type: 'varchar', length: 10 })
    destination: string;

    @Column({ name: 'departure_time', type: 'timestamp' })
    departureTime: Date;

    @Column({ type: 'int' })
    capacity: number;

    @Column({ name: 'available_seats', type: 'int' })
    availableSeats: number;

    @Column({
        type: 'enum',
        enum: FlightStatus,
        default: FlightStatus.SCHEDULED,
    })
    status: FlightStatus;

    @OneToMany(() => Booking, (booking) => booking.flight)
    bookings: Booking[];
}
