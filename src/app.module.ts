import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user';
import { ClientController } from './controller/client/client.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2003',
      database: 'CRUD',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    ProductsModule,
  ],
  controllers: [AppController, UsersController, ClientController],
  providers: [AppService, UsersService],
})
export class AppModule {}
