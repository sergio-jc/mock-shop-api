import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CATEGORIES, CategoryRecord, PRODUCTS } from '../store-data';

@Injectable()
export class CategoriesService {
  findAll(): Category[] {
    return CATEGORIES.map((category) => this.mapToEntity(category));
  }

  findOne(id: string): Category | undefined {
    const category = CATEGORIES.find((c) => c.id === id);
    return category ? this.mapToEntity(category) : undefined;
  }

  findByName(name: string): Category | undefined {
    const category = CATEGORIES.find(
      (c) => c.name.toLowerCase() === name.toLowerCase(),
    );
    return category ? this.mapToEntity(category) : undefined;
  }

  findOneOrFail(id: string): Category {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Categoria con id "${id}" no encontrada`);
    }
    return category;
  }

  findByNameOrFail(name: string): Category {
    const category = this.findByName(name);
    if (!category) {
      throw new NotFoundException(
        `Categoria con nombre "${name}" no encontrada`,
      );
    }
    return category;
  }

  findByProductId(productId: string): Category | undefined {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) {
      return undefined;
    }
    return this.findOne(product.categoryId);
  }

  private mapToEntity(category: CategoryRecord): Category {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  }
}
