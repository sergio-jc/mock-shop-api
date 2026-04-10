import { Controller, Get, Param } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(): Order[] {
    return this.ordersService.findAll().map((order) => this.enrichOrder(order));
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Order[] {
    return this.ordersService
      .findByUserId(userId)
      .map((order) => this.enrichOrder(order));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Order {
    const order = this.ordersService.findOneOrFail(id);
    return this.enrichOrder(order);
  }

  private enrichOrder(order: Order): Order {
    const items = this.ordersService.findItemsByOrderId(order.id);
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
    return { ...order, items, total };
  }
}
