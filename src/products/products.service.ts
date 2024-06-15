import {HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Products } from 'src/products/interface/products.interface';
import { CreateProductDto } from './dto/create-products';


@Injectable()
export class ProductsService {
  partialUpdate(id: number, updateProductDto: Partial<CreateProductDto>): Products {
    const { name, description } = updateProductDto;
    // Tu lógica de actualización parcial aquí
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`No se encontró un producto con el ID "${id}".`);
    }
    // Actualizar solo los campos proporcionados
    if (name) {
      this.products[productIndex].name = name;
    }
    if (description) {
      this.products[productIndex].description = description;
    }
    return this.products[productIndex];
  }
  private products: Products[] = [
    {
      id: 1,
      name: 'Nike',
      description: 'Zapatillas deportivas',
    },
    {
      id: 2,
      name: 'Adidas',
      description: 'Zapatillas y Ropa',
    }
  ];

  getAll(): Products[] {
    return this.products;
  }

  getId(id: number): Products {
    const product = this.products.find( (item: Products) => item.id === id);
    if (product) {
      return product;
    } else {
      throw new NotFoundException(`No se encontró el producto con ID ${id}`);
    }
  }

  insert(createProductDto: CreateProductDto) {
    const { name, description } = createProductDto;
    this.products = [
      ...this.products,
      {
        id: this.lastId() + 1,
        name,
        description,
      }
    ];
  }

  update(id: number, updateProductDto: CreateProductDto): Products {
    const { name, description } = updateProductDto;
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`No se encontró un producto con el ID "${id}".`);
    }
    this.products[productIndex] = { ...this.products[productIndex], name, description };
    return this.products[productIndex];
  }

  delete(id: number) {
    const product = this.products.find((item: Products) => item.id === id);
    if (product) {
      this.products = this.products.filter((item: Products) => item.id !== id);
    } else {
      throw new HttpException(`No existe el producto con ID ${id}.`, HttpStatus.NOT_FOUND);
    }
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }
}

      // updateByName(name: string, body: { name: string; description: string }): Products | null {
      //   if (!name) {
      //     throw new BadRequestException('El nombre del producto es requerido para la actualización.');
      //   }
      //   if (!body.name || !body.description) {
      //     throw new BadRequestException('El cuerpo de la solicitud debe incluir "name" y "description".');
      //   }
      //   const index = this.products.findIndex(product => product.name === name);
      //   if (index !== -1) {
      //     this.products[index] = { ...this.products[index], ...body };
      //     return this.products[index];
      //   } else {
      //     throw new NotFoundException(`No se encontró un producto con el nombre "${name}".`);
      //   }
      // }
