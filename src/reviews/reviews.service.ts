import { Injectable, NotFoundException } from '@nestjs/common';
import { REVIEWS, ReviewRecord } from '../store-data';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  findAll(): Review[] {
    return REVIEWS.map((review) => this.mapToEntity(review));
  }

  findOne(id: string): Review | undefined {
    const review = REVIEWS.find((item) => item.id === id);
    return review ? this.mapToEntity(review) : undefined;
  }

  findOneOrFail(id: string): Review {
    const review = this.findOne(id);
    if (!review) {
      throw new NotFoundException(`Reseña con id "${id}" no encontrada`);
    }
    return review;
  }

  findByUserId(userId: string): Review[] {
    return REVIEWS.filter((review) => review.userId === userId).map((review) =>
      this.mapToEntity(review),
    );
  }

  findByProductId(productId: string): Review[] {
    return REVIEWS.filter((review) => review.productId === productId).map(
      (review) => this.mapToEntity(review),
    );
  }

  private mapToEntity(review: ReviewRecord): Review {
    return {
      id: review.id,
      title: review.title,
      comment: review.comment,
      rating: review.rating,
      userId: review.userId,
      productId: review.productId,
      user: undefined as never,
      product: undefined as never,
      createdAt: review.createdAt,
    };
  }
}
