import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@ApiTags('Categories')
@Controller({ path: 'categories', version: '1' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'List all categories' })
  @ApiOkResponse({ type: [Category], description: 'Array of all categories' })
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get a single category by ID' })
  @ApiParam({
    name: 'id',
    description: 'Category CUID',
    example: 'clx1abc2300001',
  })
  @ApiOkResponse({ type: Category, description: 'The requested category' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOneOrFail(id);
  }
}
