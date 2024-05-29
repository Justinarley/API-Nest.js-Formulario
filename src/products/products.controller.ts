import { Controller, Get, Post, Body, Param, Res, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get('get/:id')
  find(@Res() response, @Param('id') id:number) {
    if(id >= 100){
      return response.status(HttpStatus.NOT_FOUND).send(`No existe`);
    } else if (50 <= id && id <= 99){
      return response.status(HttpStatus.OK).send(`Mensaje 1 de 50 a 99`);
    } else if (id >= 0 && id <= 50){
      return response.status(HttpStatus.OK).send(`Mensaje 2 de 1 a 49`);
    }
  }
  @Get(':id')
  getspecialProductsIndividual(@Param('id') id:number){
    return `Bien ${id}`
  }
  @Get(':id/:size')
  findOutThisSize(@Param('id') id:number, @Param('size') size:number){
    return `Bien ${id} y el tamano ${size}`
  }
  @Post()
  createProduct(@Body('name') name:string, @Body('description') description:string ){
    return `Producto Creado ${name}, y descripcion ${description} `
  }
  @Post('crear')
  @HttpCode(202)
  createProductWithCode(@Body('name') name:string, @Body('description') description:string ){
    return `Producto Creado ${name}, y descripcion ${description} `
  }
}
