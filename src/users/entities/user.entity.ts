import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/entities/order.entity';
import { Review } from '../../reviews/entities/review.entity';

@ObjectType({ description: 'A registered user of the platform' })
export class User {
  @ApiProperty({ description: 'Unique user identifier (CUID)', example: 'clx1abc2300001' })
  @Field(() => ID, { description: 'Unique user identifier' })
  id: string;

  @ApiProperty({ description: "User's first name", example: 'Jane' })
  @Field({ description: "User's first name" })
  firstName: string;

  @ApiProperty({ description: "User's last name", example: 'Doe' })
  @Field({ description: "User's last name" })
  lastName: string;

  @ApiProperty({ description: "User's unique email address", example: 'jane.doe@example.com' })
  @Field({ description: "User's unique email address" })
  email: string;

  @ApiProperty({ description: 'Timestamp of the last time the user visited the platform', example: '2024-01-15T10:30:00.000Z', nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Timestamp of the last platform visit' })
  lastVisit: Date | null;

  @ApiProperty({ description: 'Account creation timestamp', example: '2023-06-01T08:00:00.000Z' })
  @Field(() => GraphQLISODateTime, { description: 'Account creation timestamp' })
  createdAt: Date;

  @Field(() => [Review], { description: 'All reviews written by this user' })
  reviews: Review[];

  @Field(() => [Order], { description: 'All orders placed by this user' })
  orders: Order[];
}
