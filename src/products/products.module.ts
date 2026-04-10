import { forwardRef, Module } from '@nestjs/common';
import { ReviewsModule } from '../reviews/reviews.module';
import { ProductsController } from './products.controller';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [forwardRef(() => ReviewsModule)],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsResolver],
  exports: [ProductsService],
})
export class ProductsModule {}
