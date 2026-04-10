import { forwardRef, Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './orders.controller';
import { OrderItemsResolver, OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => ProductsModule)],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersResolver, OrderItemsResolver],
  exports: [OrdersService],
})
export class OrdersModule {}
