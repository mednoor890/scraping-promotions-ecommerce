import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductsType } from 'src/libs/dto/products.dto';
import { ProductsService } from 'src/products/domain/products.service';
import { AuthGuards } from 'src/users/domain/auth.guard';
@Resolver()
@UseGuards(AuthGuards)
export class ProductsQueries {
  constructor(private productsService: ProductsService) {}
  @Query(() => [ProductsType])
  async getProducts(): Promise<ProductsType[]> {
    return await this.productsService.findAll();
  }
  @Query(() => ProductsType)
  async getProduct(
    @Args('_id', { type: () => String }) _id: string,
  ): Promise<ProductsType> {
    return await this.productsService.findById(_id);
  }
}
