import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

@Controller('client')
export class ClientController {
    @Get('query')
    rutaQuery(@Query() query) {
        return `el dato query.x ha recibido el valor de ${query.x} y el dato de query.y ha recibido el valor de ${query.y}`;
    }
    @Get('cars')
    carsQuery(@Query('count', ParseIntPipe) carCount: number) {
    return `La cuenta de carCount es de ${carCount}`;
    }
}
