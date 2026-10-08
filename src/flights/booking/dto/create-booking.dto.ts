import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateBookingnDto {
    @IsInt({ message: 'El id del evento debe ser un número entero' })
    @IsPositive({ message: 'El id del evento debe ser positivo' })
    BookingId!: number;

    @IsInt({ message: 'Los cupos deben ser un número entero' })
    @Min(1, { message: 'Debes reservar al menos 1 cupo' })
    spots!: number;
}