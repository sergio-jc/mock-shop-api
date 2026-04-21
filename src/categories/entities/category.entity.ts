import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({
  description: 'A product category grouping related products together',
})
export class Category {
  @ApiProperty({
    description: 'Unique category identifier (CUID)',
    example: 'clx1abc2300001',
  })
  @Field(() => ID, { description: 'Unique category identifier' })
  id: string;

  @ApiProperty({ description: 'Category display name', example: 'Electronics' })
  @Field({ description: 'Category display name' })
  name: string;

  @ApiProperty({
    description: 'Optional longer description of the category',
    example: 'Gadgets and devices',
    nullable: true,
  })
  @Field(() => String, {
    nullable: true,
    description: 'Optional longer description of the category',
  })
  description: string | null;
}
