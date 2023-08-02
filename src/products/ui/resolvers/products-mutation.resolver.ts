import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
//import { CategoryService } from 'src/category/domain/category.service';
import { ProductsType } from 'src/libs/dto/products.dto';
import { createInputType } from 'src/libs/inputs/products.input';
import { ProductsService } from 'src/products/domain/products.service';
import { AuthGuards } from 'src/users/domain/auth.guard';

@Resolver()
@UseGuards(AuthGuards)
export class ProductsMutations {
  constructor(
    private productsService: ProductsService, //private categoryService: CategoryService,
  ) {}
  @Mutation(() => ProductsType)
  async createProduct(
    @Args('product_details') product: createInputType,
  ): Promise<ProductsType> {
    return await this.productsService.create(product);
  }
  @Mutation(() => ProductsType)
  async updateProduct(
    @Args('id') _id: string,
    @Args('product') product: createInputType,
  ): Promise<ProductsType> {
    const updatedProduct = await this.productsService.update(_id, product);
    return updatedProduct;
  }
  @Mutation(() => ProductsType)
  async deleteProduct(@Args('id') _id: string): Promise<ProductsType> {
    const deletedProduct = await this.productsService.delete(_id);
    return deletedProduct;
  }
  @Mutation(() => ProductsType)
  async addRating(
    @Args('productId') _id: string,
    @Args('rating') rating: number,
  ): Promise<ProductsType> {
    // Call the service method to add the rating to the product
    const rated = await this.productsService.rateProduct(_id, rating);
    return rated;
  }
}
