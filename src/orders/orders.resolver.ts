import {
  Args,
  Context,
  Float,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import type { GqlContext } from '../dataloader/gql-context.interface';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order], { name: 'orders' })
  orders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order', nullable: true })
  order(@Args('id', { type: () => ID }) id: string): Promise<Order | null> {
    return this.ordersService.findOne(id);
  }

  @ResolveField(() => User)
  user(@Parent() order: Order, @Context() ctx: GqlContext): Promise<User> {
    return ctx.loaders.userById.load(order.userId) as Promise<User>;
  }

  @ResolveField(() => [OrderItem])
  items(
    @Parent() order: Order,
    @Context() ctx: GqlContext,
  ): Promise<OrderItem[]> {
    return ctx.loaders.itemsByOrderId.load(order.id) as Promise<OrderItem[]>;
  }

  @ResolveField(() => Float)
  total(@Parent() order: Order, @Context() ctx: GqlContext): Promise<number> {
    return ctx.loaders.totalByOrderId.load(order.id);
  }
}

@Resolver(() => OrderItem)
export class OrderItemsResolver {
  @ResolveField(() => Product)
  product(
    @Parent() item: OrderItem,
    @Context() ctx: GqlContext,
  ): Promise<Product> {
    return ctx.loaders.productById.load(item.productId) as Promise<Product>;
  }
}
