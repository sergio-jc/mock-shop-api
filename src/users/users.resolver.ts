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
import { Order } from '../orders/entities/order.entity';
import { Review } from '../reviews/entities/review.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  user(@Args('id', { type: () => ID }) id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @ResolveField(() => [Review])
  reviews(@Parent() user: User, @Context() ctx: GqlContext): Promise<Review[]> {
    return ctx.loaders.reviewsByUserId.load(user.id) as Promise<Review[]>;
  }

  @ResolveField(() => [Order])
  orders(@Parent() user: User, @Context() ctx: GqlContext): Promise<Order[]> {
    return ctx.loaders.ordersByUserId.load(user.id) as Promise<Order[]>;
  }
}
