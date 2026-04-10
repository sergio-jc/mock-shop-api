import {
  Args,
  Float,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  @Query(() => [Order], { name: 'orders' })
  orders(): Order[] {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order', nullable: true })
  order(@Args('id', { type: () => ID }) id: string): Order | null {
    return this.ordersService.findOne(id) ?? null;
  }

  @ResolveField(() => User)
  user(@Parent() order: Order): User {
    const user = this.usersService.findOne(order.userId);
    if (!user) {
      throw new Error(`Usuario no encontrado para la orden "${order.id}"`);
    }
    return user;
  }

  @ResolveField(() => [OrderItem])
  items(@Parent() order: Order): OrderItem[] {
    return this.ordersService.findItemsByOrderId(order.id);
  }

  @ResolveField(() => Float)
  total(@Parent() order: Order): number {
    const items = this.ordersService.findItemsByOrderId(order.id);
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }
}

@Resolver(() => OrderItem)
export class OrderItemsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @ResolveField(() => Product)
  product(@Parent() item: OrderItem): Product {
    const product = this.productsService.findOne(item.productId);
    if (!product) {
      throw new Error(`Producto no encontrado para item "${item.id}"`);
    }
    return product;
  }
}
