import { Injectable } from '@nestjs/common/decorators';
import { CategoryRepository } from 'src/category/infrastructure/repositories/category.repository';
import { ProductsRepository } from '../intrastructure/repositories/products.repository';
import { Products } from '../intrastructure/schemas/products.schema';
@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoryRepository: CategoryRepository,
  ) {}
  async findAll() {
    return await this.productsRepository.findAll();
  }
  async findById(_id: string) {
    return await this.productsRepository.findById(_id);
  }
  async update(_id: string, products: Products) {
    return await this.productsRepository.update(_id, products);
  }
  async delete(_id: string) {
    return await this.productsRepository.delete(_id);
  }
  async create(products: Products): Promise<Products> {
    const createdProduct = await this.productsRepository.create(products);
    /*const category = await this.categoryRepository.findOneById(
      products.category._id,
    );
    category.products.push(createdProduct);*/

    return createdProduct;
  }
  async getProductsByCategory(categoryId: string): Promise<Products[]> {
    return this.productsRepository.getProductsByCategory(categoryId);
  }
  async getHighestDiscountAziza(): Promise<Products[]> {
    return await this.productsRepository.getHighestDiscountAziza();
  }
  async getHighestDiscountPointM(): Promise<Products[]> {
    return await this.productsRepository.getHighestDiscountPointM();
  }
  async getHighestDiscountExist(): Promise<Products[]> {
    return await this.productsRepository.getHighestDiscountExist();
  }
}
