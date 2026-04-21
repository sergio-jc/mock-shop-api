import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DataloaderService {
  constructor(private readonly prisma: PrismaService) {}

  createLoaders() {
    return {
      categoryById: new DataLoader(async (ids: readonly string[]) => {
        const rows = await this.prisma.category.findMany({
          where: { id: { in: [...ids] } },
        });
        const map = new Map(rows.map((r) => [r.id, r]));
        return ids.map(
          (id) => map.get(id) ?? new Error(`Category ${id} not found`),
        );
      }),

      userById: new DataLoader(async (ids: readonly string[]) => {
        const rows = await this.prisma.user.findMany({
          where: { id: { in: [...ids] } },
        });
        const map = new Map(rows.map((r) => [r.id, r]));
        return ids.map(
          (id) => map.get(id) ?? new Error(`User ${id} not found`),
        );
      }),

      productById: new DataLoader(async (ids: readonly string[]) => {
        const rows = await this.prisma.product.findMany({
          where: { id: { in: [...ids] } },
        });
        const map = new Map(rows.map((r) => [r.id, r]));
        return ids.map(
          (id) => map.get(id) ?? new Error(`Product ${id} not found`),
        );
      }),

      reviewsByProductId: new DataLoader(async (ids: readonly string[]) => {
        const rows = await this.prisma.review.findMany({
          where: { productId: { in: [...ids] } },
        });
        return ids.map((id) => rows.filter((r) => r.productId === id));
      }),

      reviewsByUserId: new DataLoader(async (ids: readonly string[]) => {
        const rows = await this.prisma.review.findMany({
          where: { userId: { in: [...ids] } },
        });
        return ids.map((id) => rows.filter((r) => r.userId === id));
      }),

      ordersByUserId: new DataLoader(async (ids: readonly string[]) => {
        const rows = await this.prisma.order.findMany({
          where: { userId: { in: [...ids] } },
        });
        return ids.map((id) => rows.filter((r) => r.userId === id));
      }),

      itemsByOrderId: new DataLoader(async (ids: readonly string[]) => {
        const rows = await this.prisma.orderItem.findMany({
          where: { orderId: { in: [...ids] } },
        });
        return ids.map((id) => rows.filter((r) => r.orderId === id));
      }),

      productsByCategoryId: new DataLoader(async (ids: readonly string[]) => {
        const rows = await this.prisma.product.findMany({
          where: { categoryId: { in: [...ids] } },
        });
        return ids.map((id) => rows.filter((r) => r.categoryId === id));
      }),

      ratingByProductId: new DataLoader(async (ids: readonly string[]) => {
        const results = await this.prisma.review.groupBy({
          by: ['productId'],
          where: { productId: { in: [...ids] } },
          _avg: { rating: true },
        });
        const map = new Map(results.map((r) => [r.productId, r._avg.rating]));
        return ids.map((id) => map.get(id) ?? null);
      }),

      totalByOrderId: new DataLoader(async (ids: readonly string[]) => {
        const items = await this.prisma.orderItem.findMany({
          where: { orderId: { in: [...ids] } },
          select: { orderId: true, quantity: true, unitPrice: true },
        });
        const totals = new Map<string, number>();
        for (const item of items) {
          totals.set(
            item.orderId,
            (totals.get(item.orderId) ?? 0) + item.quantity * item.unitPrice,
          );
        }
        return ids.map((id) => totals.get(id) ?? 0);
      }),
    };
  }
}
