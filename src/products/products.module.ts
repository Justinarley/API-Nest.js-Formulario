import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductsService],
})
export class ProductsModule {}
