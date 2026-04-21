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
import { Category } from '../categories/entities/category.entity';
import { Review } from '../reviews/entities/review.entity';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  product(@Args('id', { type: () => ID }) id: string): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @ResolveField(() => Category)
  category(
    @Parent() product: Product,
    @Context() ctx: GqlContext,
  ): Promise<Category> {
    return ctx.loaders.categoryById.load(
      product.categoryId,
    ) as Promise<Category>;
  }

  @ResolveField(() => [Review])
  reviews(
    @Parent() product: Product,
    @Context() ctx: GqlContext,
  ): Promise<Review[]> {
    return ctx.loaders.reviewsByProductId.load(product.id) as Promise<Review[]>;
  }

  @ResolveField(() => Float, { nullable: true })
  rating(
    @Parent() product: Product,
    @Context() ctx: GqlContext,
  ): Promise<number | null> {
    return ctx.loaders.ratingByProductId.load(product.id);
  }
}
