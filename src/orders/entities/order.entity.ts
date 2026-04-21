import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../generated/prisma/client';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Possible lifecycle states of an order',
  valuesMap: {
    PENDING: { description: 'Order placed but not yet processed' },
    PROCESSING: { description: 'Order is being prepared' },
    COMPLETED: { description: 'Order was successfully delivered' },
    CANCELLED: { description: 'Order was cancelled' },
  },
});

@ObjectType({ description: 'A purchase order placed by a user' })
export class Order {
  @ApiProperty({ description: 'Unique order identifier (CUID)', example: 'clx1abc2300001' })
  @Field(() => ID, { description: 'Unique order identifier' })
  id: string;

  @ApiProperty({ description: 'ID of the user who placed this order', example: 'clx1abc2300001' })
  userId: string;

  @Field(() => User, { description: 'User who placed this order' })
  user: User;

  @Field(() => [OrderItem], { description: 'Line items included in this order' })
  items: OrderItem[];

  @ApiProperty({ description: 'Total order value in USD (sum of quantity × unitPrice for all items)', example: 199.98 })
  @Field(() => Float, { description: 'Total order value in USD' })
  total: number;

  @ApiProperty({ enum: OrderStatus, description: 'Current lifecycle status of the order', example: OrderStatus.PENDING })
  @Field(() => OrderStatus, { description: 'Current lifecycle status of the order' })
  status: OrderStatus;

  @ApiProperty({ description: 'Timestamp when the order was placed', example: '2024-03-01T09:00:00.000Z' })
  @Field(() => GraphQLISODateTime, { description: 'Timestamp when the order was placed' })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp of the last status update', example: '2024-03-02T14:00:00.000Z' })
  @Field(() => GraphQLISODateTime, { description: 'Timestamp of the last status update' })
  updatedAt: Date;
}
