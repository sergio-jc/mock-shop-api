import {
  Args,
  Context,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import type { GqlContext } from '../dataloader/gql-context.interface';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => [Review], { name: 'reviews' })
  reviews(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Query(() => Review, { name: 'review', nullable: true })
  review(@Args('id', { type: () => ID }) id: string): Promise<Review | null> {
    return this.reviewsService.findOne(id);
  }

  @ResolveField(() => User)
  user(@Parent() review: Review, @Context() ctx: GqlContext): Promise<User> {
    return ctx.loaders.userById.load(review.userId) as Promise<User>;
  }

  @ResolveField(() => Product)
  product(
    @Parent() review: Review,
    @Context() ctx: GqlContext,
  ): Promise<Product> {
    return ctx.loaders.productById.load(review.productId) as Promise<Product>;
  }
}
