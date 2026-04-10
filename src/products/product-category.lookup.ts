import { NotFoundException } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { CATEGORIES, PRODUCTS } from '../store-data';

export function getCategoryForProductOrThrow(productId: string): Category {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    throw new NotFoundException(`Producto con id "${productId}" no encontrado`);
  }
  const category = CATEGORIES.find((c) => c.id === product.categoryId);
  if (!category) {
    throw new NotFoundException(
      `Categoria no encontrada para el producto "${productId}"`,
    );
  }
  return {
    id: category.id,
    name: category.name,
    description: category.description,
  };
}
