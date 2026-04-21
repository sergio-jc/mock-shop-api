import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'List all orders' })
  @ApiOkResponse({ type: [Order], description: 'Array of all orders' })
  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Get a single order by ID' })
  @ApiParam({
    name: 'id',
    description: 'Order CUID',
    example: 'clx1abc2300001',
  })
  @ApiOkResponse({ type: Order, description: 'The requested order' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOneOrFail(id);
  }

  @ApiOperation({ summary: 'List all orders placed by a specific user' })
  @ApiParam({
    name: 'userId',
    description: 'User CUID',
    example: 'clx1abc2300001',
  })
  @ApiOkResponse({ type: [Order], description: "Array of the user's orders" })
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.findByUserId(userId);
  }
}
