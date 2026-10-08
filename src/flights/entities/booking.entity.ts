import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/auth/entities/user.entity';
import { Flight } from './flight.entity';

export enum BookingStatus {
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
}

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.bookings, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Flight, (flight) => flight.bookings, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'flight_id' })
    flight!: Flight;

    @Column({ name: 'seat_count', type: 'int' })
    seatCount!: number;

    @Column({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.CONFIRMED,
    })
    status!: BookingStatus;

    @Column({ name: 'booking_reference', type: 'varchar', length: 50, nullable: true })
    bookingReference!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
