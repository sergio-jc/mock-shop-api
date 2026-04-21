import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller({ path: 'reviews', version: '1' })
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'List all reviews' })
  @ApiOkResponse({ type: [Review], description: 'Array of all reviews' })
  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @ApiOperation({ summary: 'Get a single review by ID' })
  @ApiParam({
    name: 'id',
    description: 'Review CUID',
    example: 'clx1abc2300001',
  })
  @ApiOkResponse({ type: Review, description: 'The requested review' })
  @ApiNotFoundResponse({ description: 'Review not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOneOrFail(id);
  }

  @ApiOperation({ summary: 'List all reviews written by a specific user' })
  @ApiParam({
    name: 'userId',
    description: 'User CUID',
    example: 'clx1abc2300001',
  })
  @ApiOkResponse({
    type: [Review],
    description: 'Array of reviews by the user',
  })
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Review[]> {
    return this.reviewsService.findByUserId(userId);
  }

  @ApiOperation({ summary: 'List all reviews for a specific product' })
  @ApiParam({
    name: 'productId',
    description: 'Product CUID',
    example: 'clx1abc2300001',
  })
  @ApiOkResponse({
    type: [Review],
    description: 'Array of reviews for the product',
  })
  @Get('product/:productId')
  findByProductId(@Param('productId') productId: string): Promise<Review[]> {
    return this.reviewsService.findByProductId(productId);
  }
}
