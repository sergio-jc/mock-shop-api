import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { PRODUCTS, ProductRecord } from '../store-data';

@Injectable()
export class ProductsService {
  findAll(): Product[] {
    return PRODUCTS.map((product) => this.mapToEntity(product));
  }

  findOne(id: string): Product | undefined {
    const product = PRODUCTS.find((p) => p.id === id);
    return product ? this.mapToEntity(product) : undefined;
  }

  findByCategoryId(categoryId: string): Product[] {
    return PRODUCTS.filter((p) => p.categoryId === categoryId).map((product) =>
      this.mapToEntity(product),
    );
  }

  findOneOrFail(id: string): Product {
    const product = this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Producto con id "${id}" no encontrado`);
    }
    return product;
  }

  private mapToEntity(product: ProductRecord): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      rating: null,
    };
  }
}
