import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

@ObjectType({ description: 'A single line item within an order' })
export class OrderItem {
  @ApiProperty({ description: 'Unique order item identifier (CUID)', example: 'clx1abc2300001' })
  @Field(() => ID, { description: 'Unique order item identifier' })
  id: string;

  @ApiProperty({ description: 'ID of the order this item belongs to', example: 'clx1abc2300001' })
  orderId: string;

  @ApiProperty({ description: 'ID of the product ordered', example: 'clx1abc2300001' })
  productId: string;

  @Field(() => Product, { description: 'The product ordered' })
  product: Product;

  @ApiProperty({ description: 'Number of units ordered', example: 2 })
  @Field(() => Int, { description: 'Number of units ordered' })
  quantity: number;

  @ApiProperty({ description: 'Price per unit at the time of purchase (USD)', example: 99.99 })
  @Field(() => Float, { description: 'Price per unit at the time of purchase (USD)' })
  unitPrice: number;
}
