import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  @Query(() => [Category], { name: 'categories' })
  categories(): Category[] {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category', nullable: true })
  category(@Args('id', { type: () => ID }) id: string): Category | null {
    return this.categoriesService.findOne(id) ?? null;
  }

  @Query(() => Category, { name: 'categoryByName', nullable: true })
  categoryByName(@Args('name') name: string): Category | null {
    return this.categoriesService.findByName(name) ?? null;
  }

  @ResolveField(() => [Product])
  products(@Parent() category: Category): Product[] {
    return this.productsService.findByCategoryId(category.id);
  }
}
