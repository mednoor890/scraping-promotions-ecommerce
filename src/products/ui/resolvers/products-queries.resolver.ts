import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AuthCustomersGuards } from 'src/customers/domain/customersAuth.guard';
import { ProductsType } from 'src/libs/dto/products.dto';
import { ProductsService } from 'src/products/domain/products.service';
import { AuthGuards } from 'src/users/domain/auth.guard';
@Resolver()
export class ProductsQueries {
  constructor(private productsService: ProductsService) {}
  @Query(() => [ProductsType])
  @UseGuards(AuthCustomersGuards, AuthGuards)
  async getProducts(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<ProductsType[]> {
    return await this.productsService.findAll(page, limit);
  }
  @Query(() => ProductsType)
  @UseGuards(AuthGuards)
  async getProduct(
    @Args('_id', { type: () => String }) _id: string,
  ): Promise<ProductsType> {
    return await this.productsService.findById(_id);
  }
  @Query(() => [ProductsType])
  @UseGuards(AuthGuards)
  async getProductsByCategory(
    @Args('categoryId') categoryId: string,
  ): Promise<ProductsType[]> {
    return await this.productsService.getProductsByCategory(categoryId);
  }
  @Query(() => [ProductsType])
  async getHighestDiscountAziza(): Promise<ProductsType[]> {
    return await this.productsService.getHighestDiscountAziza();
  }
  @Query(() => [ProductsType])
  async getHighestDiscountPointM(): Promise<ProductsType[]> {
    return await this.productsService.getHighestDiscountPointM();
  }
  @Query(() => [ProductsType])
  async getHighestDiscountExist(): Promise<ProductsType[]> {
    return await this.productsService.getHighestDiscountExist();
  }
  @Query(() => [ProductsType])
  async getHighestDiscountBaity(): Promise<ProductsType[]> {
    return await this.productsService.getHighestDiscountBaity();
  }
  @Query(() => [ProductsType])
  async getHighestDiscountWiki(): Promise<ProductsType[]> {
    return await this.productsService.getHighestDiscountWiki();
  }
  @Query(() => [ProductsType])
  async getLowestPrices(): Promise<ProductsType[]> {
    return await this.productsService.getLowestPrices();
  }
  @Query(() => [ProductsType])
  //@UseGuards(AuthGuards)
  async getAziza(): Promise<ProductsType[]> {
    return await this.productsService.getAziza();
  }
  @Query(() => [ProductsType])
  // @UseGuards(AuthGuards)
  async getBaity(): Promise<ProductsType[]> {
    return await this.productsService.getBaity();
  }
  @Query(() => [ProductsType])
  //@UseGuards(AuthGuards)
  async getExist(): Promise<ProductsType[]> {
    return await this.productsService.getExist();
  }
  @Query(() => [ProductsType])
  //@UseGuards(AuthGuards)
  async getWiki(): Promise<ProductsType[]> {
    return await this.productsService.getWiki();
  }
  @Query(() => [ProductsType])
  //@UseGuards(AuthGuards)
  async getPointM(): Promise<ProductsType[]> {
    return await this.productsService.getPointM();
  }
  @Query(() => [ProductsType])
  async getProductsBySearch(
    @Args('productName') productName: string,
  ): Promise<ProductsType[]> {
    return await this.productsService.getProductsBySearch(productName);
  }
}
