import { Controller, Get, Post, Body, Param, Res, HttpStatus, HttpCode, Put, Delete, ParseIntPipe, UsePipes, Patch, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

import { ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    try {
      const products = this.productsService.getAll();
      return {
        message: 'Todos los productos',
        data: products,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = this.productsService.getId(id);
      if (!product) {
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }
      return {
        message: `Producto con id ${id}`,
        data: product,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el producto');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    try {
      this.productsService.insert(createProductDto);
      return {
        message: 'Producto creado correctamente',
        data: this.productsService.getAll(),
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateProductById(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateProductDto: CreateProductDto) {
    try {
      const updatedProduct = this.productsService.update(id, updateProductDto);
      if (!updatedProduct) {
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }
      return {
        message: `Producto actualizado: ${updatedProduct.name}`,
        data: updatedProduct,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateProductPartial(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateProductDto: CreateProductDto) {
    try {
      if (Object.keys(updateProductDto).length === 0) {
        throw new BadRequestException('No se proporcionaron datos para actualizar.');
      }

      const updatedProduct = this.productsService.partialUpdate(id, updateProductDto);
      if (!updatedProduct) {
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }
      return {
        message: `Producto parcialmente actualizado: ${updatedProduct.name}`,
        data: updatedProduct,
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.productsService.delete(id);
    return {
      message: `Producto eliminado con ID ${id}`,
      data: this.productsService.getAll(),
    };
  }
}



  // @Get('traer/:id')
  // find(@Res() response, @Param('id') id: number) {
  //   if (id >= 100) {
  //     return response.status(HttpStatus.NOT_FOUND).send(`No existe`);
  //   } else if (50 <= id && id <= 99) {
  //     return response.status(HttpStatus.OK).send(`Mensaje 1 ${id}`);
  //   } else if (id >= 0 && id <= 50) {
  //     return response.status(HttpStatus.OK).send(`Mensaje 2 ${id}
  //     3.060| `);
  //   }
  // }
  // @Get(':id')
  // getspecialProductsIndividual(@Param('id') id: number) {
  //   return `El id es ${id}`
  // }
  // @Get(':id/:size')
  // findOutThisSize(@Param('id') id: number, @Param('size') size: number) {
  //   return `Bien el id: ${id} y el tamano es: ${size}`
  // }
  // @Post()
  // createProducts(@Body('name') name: string, @Body('description') description: string) {
  //   return `Producto Creado ${name}, y descripcion ${description} `
  // }
  // @Post('crear')
  // @HttpCode(202)
  // createProductWithCode(@Body('name') name: string, @Body('description') description: string) {
  //   return `Producto Creado ${name}, y descripcion ${description} `
  // }
  // @Put(':id')
  // update(@Param('id') id: number, @Body() body) {
  //   return `Estás haciendo una operación de actualización del recurso ${id} 
  //         con ${body.name} y ${body.description}`;
  // }
  // @Patch(':id')
  // partialUpdate(@Param('id') id: number, @Body() body) {
  //   return `Actualización parcial del ítem ${id}
  //          el ${body.name} y ${body.description}`;
  // }
  // @Delete(':id')
  // @HttpCode(202)
  // delete(@Param('id') id: number) {
  //   return `Hemos borrado el producto ${id}`;
  // }

