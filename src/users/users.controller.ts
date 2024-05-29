import { Controller, Get, Post, Body, Put, Delete, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() userData: User): Promise<User> {
    // Puedes realizar cualquier lógica de validación adicional aquí si es necesario
    return this.usersService.create(userData);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() userData: User): Promise<User> {
    const user = await this.usersService.update(id, userData);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  @Delete(':id')
    async delete(@Param('id') id: number): Promise<{ success: boolean }> {
        const success = await this.usersService.delete(id);
        return { success }; // Devuelve un objeto indicando si la eliminación fue exitosa
    }
  }
