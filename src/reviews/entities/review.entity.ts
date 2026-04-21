import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType({ description: 'A user review for a specific product' })
export class Review {
  @ApiProperty({
    description: 'Unique review identifier (CUID)',
    example: 'clx1abc2300001',
  })
  @Field(() => ID, { description: 'Unique review identifier' })
  id: string;

  @ApiProperty({
    description: 'Short title summarizing the review',
    example: 'Great sound quality!',
  })
  @Field({ description: 'Short title summarizing the review' })
  title: string;

  @ApiProperty({
    description: 'Optional full review text',
    example: 'The bass is punchy and the highs are crisp.',
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
    description: 'Optional full review text',
  })
  comment: string | null;

  @ApiProperty({
    description: 'Rating from 1 (worst) to 5 (best)',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @Field(() => Int, { description: 'Rating from 1 (worst) to 5 (best)' })
  rating: number;

  @ApiProperty({
    description: 'ID of the user who wrote this review',
    example: 'clx1abc2300001',
  })
  userId: string;

  @ApiProperty({
    description: 'ID of the reviewed product',
    example: 'clx1abc2300001',
  })
  productId: string;

  @Field(() => User, { description: 'User who wrote this review' })
  user: User;

  @Field(() => Product, { description: 'Product being reviewed' })
  product: Product;

  @ApiProperty({
    description: 'Timestamp when the review was submitted',
    example: '2024-02-10T14:22:00.000Z',
  })
  @Field(() => GraphQLISODateTime, {
    description: 'Timestamp when the review was submitted',
  })
  createdAt: Date;
}
