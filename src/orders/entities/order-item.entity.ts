import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  orderId: string;
  productId: string;

  @Field(() => Product)
  product: Product;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;
}
