import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ORDER_ITEMS,
  ORDERS,
  OrderItemRecord,
  OrderRecord,
} from '../store-data';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  findAll(): Order[] {
    return ORDERS.map((order) => this.mapOrderToEntity(order));
  }

  findOne(id: string): Order | undefined {
    const order = ORDERS.find((item) => item.id === id);
    return order ? this.mapOrderToEntity(order) : undefined;
  }

  findOneOrFail(id: string): Order {
    const order = this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Orden con id "${id}" no encontrada`);
    }
    return order;
  }

  findByUserId(userId: string): Order[] {
    return ORDERS.filter((order) => order.userId === userId).map((order) =>
      this.mapOrderToEntity(order),
    );
  }

  findItemsByOrderId(orderId: string): OrderItem[] {
    return ORDER_ITEMS.filter((item) => item.orderId === orderId).map((item) =>
      this.mapOrderItemToEntity(item),
    );
  }

  private mapOrderToEntity(order: OrderRecord): Order {
    return {
      id: order.id,
      userId: order.userId,
      user: undefined as never,
      items: [],
      total: 0,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  private mapOrderItemToEntity(item: OrderItemRecord): OrderItem {
    return {
      id: item.id,
      orderId: item.orderId,
      productId: item.productId,
      product: undefined as never,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    };
  }
}
