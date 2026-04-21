import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderItemsResolver, OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersResolver, OrderItemsResolver],
  exports: [OrdersService],
})
export class OrdersModule {}
