import {
  Args,
  Float,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { Category } from '../categories/entities/category.entity';
import { Review } from '../reviews/entities/review.entity';
import { ReviewsService } from '../reviews/reviews.service';
import { getCategoryForProductOrThrow } from './product-category.lookup';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Query(() => [Product], { name: 'products' })
  products(): Product[] {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product', nullable: true })
  product(@Args('id', { type: () => ID }) id: string): Product | null {
    return this.productsService.findOne(id) ?? null;
  }

  @ResolveField(() => Category)
  category(@Parent() product: Product): Category {
    return getCategoryForProductOrThrow(product.id);
  }

  @ResolveField(() => [Review])
  reviews(@Parent() product: Product): Review[] {
    return this.reviewsService.findByProductId(product.id);
  }

  @ResolveField(() => Float, { nullable: true })
  rating(@Parent() product: Product): number | null {
    const reviews = this.reviewsService.findByProductId(product.id);
    if (reviews.length === 0) {
      return null;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }
}
