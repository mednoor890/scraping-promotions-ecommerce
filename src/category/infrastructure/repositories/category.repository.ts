import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }
  async findById(_id: string): Promise<Category> {
    return await this.categoryModel.findById(_id);
  }
  async createCategory(category: Category): Promise<Category> {
    const created = new this.categoryModel(category);
    return await created.save();
  }
  async updateCategory(_id: string, category: Category): Promise<Category> {
    const updated = await this.categoryModel
      .findByIdAndUpdate(_id, category)
      .exec();
    return updated;
  }
  async deleteCategory(_id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel.findByIdAndRemove(_id);
    return deletedCategory;
  }
  async findOneById(_id: string): Promise<Category> {
    return await this.categoryModel.findById(_id).populate('Products').exec();
  }
}
