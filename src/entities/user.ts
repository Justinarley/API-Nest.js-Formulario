import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  cedula: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  apellidos: string;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

  @Column({ type: 'varchar', length: 9 })
  telefono: string;
}
