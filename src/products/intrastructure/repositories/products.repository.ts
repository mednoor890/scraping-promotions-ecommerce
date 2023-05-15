import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from '../schemas/products.schema';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Products.name) private readonly productsModel: Model<Products>,
  ) {}
  async findAll(): Promise<Products[]> {
    return await this.productsModel.find().exec();
  }
  async findById(_id: string): Promise<Products> {
    return await this.productsModel.findById(_id);
  }
  async update(_id: string, products: Products): Promise<Products> {
    return await this.productsModel.findByIdAndUpdate(_id, products);
  }
  async delete(_id: string): Promise<Products> {
    return await this.productsModel.findByIdAndRemove(_id);
  }
  async create(products: Products): Promise<Products> {
    const createdProduct = new this.productsModel(products);
    return createdProduct.save();
  }
  async getProductsByCategory(categoryId: string): Promise<Products[]> {
    const products = await this.productsModel
      .find({ categories: categoryId })
      .populate('category')
      .exec();
    return products;
  }
  async getHighestDiscountAziza(): Promise<Products[]> {
    try {
      const azizaProducts = await this.productsModel
        .find({ website: 'aziza', discount: { $lt: 0 } })
        .sort({ discount: 1 })
        .limit(5)
        .exec();

      if (azizaProducts.length > 0) {
        return azizaProducts;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error('Failed to retrieve Aziza products.');
    }
  }
  async getHighestDiscountPointM(): Promise<Products[]> {
    try {
      const PointMProducts = await this.productsModel
        .find({ website: 'pointm', discount: { $lt: 0 } })
        .sort({ discount: 1 })
        .limit(5)
        .exec();

      if (PointMProducts.length > 0) {
        return PointMProducts;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error('Failed to retrieve Aziza products.');
    }
  }
  async getHighestDiscountExist(): Promise<Products[]> {
    try {
      const PointMProducts = await this.productsModel
        .find({ website: 'exist', discount: { $lt: 0 } })
        .sort({ discount: 1 })
        .limit(5)
        .exec();

      if (PointMProducts.length > 0) {
        return PointMProducts;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error('Failed to retrieve Aziza products.');
    }
  }
}
