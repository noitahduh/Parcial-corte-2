import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateFlightDto {
    @IsString({ message: 'El nombre debe ser texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(150, { message: 'El nombre no puede superar 150 caracteres' })
    name!: string;

    @IsDateString({}, { message: 'La fecha debe ser una fecha ISO válida (ej. 2026-12-01T18:00:00Z)' })
    date!: string;

    @IsOptional()
    @IsString({ message: 'La ubicación debe ser texto' })
    @MaxLength(150)
    location?: string;

    @IsInt({ message: 'La capacidad debe ser un número entero' })
    @Min(1, { message: 'La capacidad debe ser al menos 1' })
    capacity!: number;
}