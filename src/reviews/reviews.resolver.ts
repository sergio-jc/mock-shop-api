import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  @Query(() => [Review], { name: 'reviews' })
  reviews(): Review[] {
    return this.reviewsService.findAll();
  }

  @Query(() => Review, { name: 'review', nullable: true })
  review(@Args('id', { type: () => ID }) id: string): Review | null {
    return this.reviewsService.findOne(id) ?? null;
  }

  @ResolveField(() => User)
  user(@Parent() review: Review): User {
    const user = this.usersService.findOne(review.userId);
    if (!user) {
      throw new Error(`Usuario no encontrado para review "${review.id}"`);
    }
    return user;
  }

  @ResolveField(() => Product)
  product(@Parent() review: Review): Product {
    const product = this.productsService.findOne(review.productId);
    if (!product) {
      throw new Error(`Producto no encontrado para review "${review.id}"`);
    }
    return product;
  }
}
