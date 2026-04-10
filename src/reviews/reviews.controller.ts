import { Controller, Get, Param } from '@nestjs/common';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll(): Review[] {
    return this.reviewsService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Review[] {
    return this.reviewsService.findByUserId(userId);
  }

  @Get('product/:productId')
  findByProductId(@Param('productId') productId: string): Review[] {
    return this.reviewsService.findByProductId(productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Review {
    return this.reviewsService.findOneOrFail(id);
  }
}
