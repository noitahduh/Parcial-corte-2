import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    // TODO: Implement endpoints according to the exam specifications
}

@Controller('bookings')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_event')
    create(@Body() dto: CreateEventDto) {
        return this.eventService.create(dto);
    }

    @Get()
    @Permissions('read_event')
    findAll() {
        return this.eventService.findAll();
    }

    @Get(':id')
    @Permissions('read_event')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.eventService.findOne(id);
    }

    @Patch(':id')
    @Permissions('update_event')
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateEventDto) {
        return this.eventService.update(id, dto);
    }

    @Patch(':id/deactivate')
    @Permissions('deactivate_event')
    deactivate(@Param('id', PositiveIntPipe) id: number) {
        return this.eventService.deactivate(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions('delete_event')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.eventService.remove(id);
    }
}
