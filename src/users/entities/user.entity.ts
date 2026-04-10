import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Order } from '../../orders/entities/order.entity';
import { Review } from '../../reviews/entities/review.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastVisit: Date | null;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => [Review])
  reviews: Review[];

  @Field(() => [Order])
  orders: Order[];
}
