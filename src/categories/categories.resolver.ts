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
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category], { name: 'categories' })
  categories(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category', nullable: true })
  category(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Category | null> {
    return this.categoriesService.findOne(id);
  }

  @Query(() => Category, { name: 'categoryByName', nullable: true })
  categoryByName(@Args('name') name: string): Promise<Category | null> {
    return this.categoriesService.findByName(name);
  }

  @ResolveField(() => [Product])
  products(
    @Parent() category: Category,
    @Context() ctx: GqlContext,
  ): Promise<Product[]> {
    return ctx.loaders.productsByCategoryId.load(category.id) as Promise<
      Product[]
    >;
  }
}
