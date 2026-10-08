import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    passwordHash: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    roleName: string;
}
