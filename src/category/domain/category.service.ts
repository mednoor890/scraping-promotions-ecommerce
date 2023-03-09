import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../infrastructure/repositories/category.repository';
import { Category } from '../infrastructure/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository, //private readonly productRepository: ProductRepository
  ) {}
  async createCategory(category: Category): Promise<Category> {
    return await this.categoryRepository.createCategory(category);
  }
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }
  async findById(_id: string): Promise<Category> {
    return await this.categoryRepository.findById(_id);
  }
  async updateCategory(_id: string, category: Category): Promise<Category> {
    return await this.categoryRepository.updateCategory(_id, category);
  }
  async deleteCategory(_id: string): Promise<Category> {
    return await this.categoryRepository.deleteCategory(_id);
  }
  async findOneById(_id: string): Promise<Category> {
    return this.categoryRepository.findOneById(_id);
  }
}
