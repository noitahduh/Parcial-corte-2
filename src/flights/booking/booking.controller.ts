import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';


import { Permissions } from '../auth/decorators/permissions.decorator';
import { User } from '../auth/entities/user.entity';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import type { AuthenticatedRequest } from './common/interfaces/authenticated-request.interface';

import { CreateBookingnDto } from './dto/create-booking.dto';
import { BookingService } from './booking.service';


@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

@Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_reservation')
    create(@Body() dto: CreateBookingDto, @Req() req: AuthenticatedRequest) {
        return this.bookingService.create(dto, req.user as User);
         }
 }

