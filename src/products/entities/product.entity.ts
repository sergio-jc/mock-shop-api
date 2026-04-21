import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'A product available for purchase in the catalog' })
export class Product {
  @ApiProperty({ description: 'Unique product identifier (CUID)', example: 'clx1abc2300001' })
  @Field(() => ID, { description: 'Unique product identifier' })
  id: string;

  @ApiProperty({ description: 'Product display name', example: 'Wireless Headphones' })
  @Field({ description: 'Product display name' })
  name: string;

  @ApiProperty({ description: 'Optional detailed description of the product', example: 'Noise-cancelling over-ear headphones', nullable: true })
  @Field(() => String, { nullable: true, description: 'Optional detailed description of the product' })
  description: string | null;

  @ApiProperty({ description: 'Price in USD', example: 99.99 })
  @Field(() => Float, { description: 'Price in USD' })
  price: number;

  @ApiProperty({ description: 'Units currently in stock', example: 42 })
  @Field(() => Int, { description: 'Units currently in stock' })
  stock: number;

  @ApiProperty({ description: 'URL to the product image', example: 'https://example.com/img/headphones.jpg', nullable: true })
  @Field(() => String, { nullable: true, description: 'URL to the product image' })
  imageUrl: string | null;

  @ApiProperty({ description: 'Average rating from 1–5 based on all reviews. Null when no reviews exist.', example: 4.3, nullable: true })
  @Field(() => Float, { nullable: true, description: 'Average rating (1–5) computed from all reviews' })
  rating: number | null;

  @ApiProperty({ description: 'ID of the category this product belongs to', example: 'clx1abc2300001' })
  categoryId: string;
}
