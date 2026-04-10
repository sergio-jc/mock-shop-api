import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  comment: string | null;

  @Field(() => Int)
  rating: number;

  userId: string;
  productId: string;

  @Field(() => User)
  user: User;

  @Field(() => Product)
  product: Product;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
