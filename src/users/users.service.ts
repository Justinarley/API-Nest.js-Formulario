import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(userData: Partial<User>): Promise<User> {
        // Validar datos antes de crear el usuario
        if (!userData.nombre || !userData.apellidos || !userData.correo || !userData.telefono) {
            throw new BadRequestException('Todos los campos son requeridos');
        }
        
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`No existe el id o ya lo elimino ${id} not found`);
        }
    
        return user;
    }

    
    async update(id: number, newData: Partial<User>): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        Object.assign(user, newData);
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected > 0; // Devuelve true si se eliminó al menos un registro
    }
}
