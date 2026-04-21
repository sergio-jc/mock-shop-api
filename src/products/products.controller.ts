import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'List all products' })
  @ApiOkResponse({ type: [Product], description: 'Array of all products' })
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiParam({
    name: 'id',
    description: 'Product CUID',
    example: 'clx1abc2300001',
  })
  @ApiOkResponse({ type: Product, description: 'The requested product' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOneOrFail(id);
  }
}
