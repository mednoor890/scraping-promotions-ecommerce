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
      const ExistProducts = await this.productsModel
        .find({ website: 'exist', discount: { $lt: 0 } })
        .sort({ discount: 1 })
        .limit(5)
        .exec();

      if (ExistProducts.length > 0) {
        return ExistProducts;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error('Failed to retrieve Aziza products.');
    }
  }
  async getHighestDiscountWiki(): Promise<Products[]> {
    try {
      const WikiProducts = await this.productsModel
        .find({ website: 'wiki', discount: { $lt: 0 } })
        .sort({ discount: 1 })
        .limit(5)
        .exec();

      if (WikiProducts.length > 0) {
        return WikiProducts;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error('Failed to retrieve Aziza products.');
    }
  }
  async getLowestPrices(): Promise<Products[]> {
    try {
      const LowestPrices = await this.productsModel
        .find()
        .sort({ price: 1 })
        .limit(5)
        .exec();
      if (LowestPrices.length > 0) {
        return LowestPrices;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error('failed to retrieve lowest 5 prices');
    }
  }
  async getAziza(): Promise<Products[]> {
    try {
      const Aziza = await this.productsModel
        .find({ website: 'aziza' })
        .sort({ discount: 1 })
        .exec();
      console.log(Aziza.length);
      return Aziza;
    } catch (error) {
      console.error(error);
    }
  }
  async getExist(): Promise<Products[]> {
    try {
      const Exist = await this.productsModel
        .find({ website: 'exist' })
        .sort({ discount: 1 })
        .exec();
      console.log(Exist.length);
      return Exist;
    } catch (error) {
      console.error(error);
    }
  }
  async getWiki(): Promise<Products[]> {
    try {
      const Wiki = await this.productsModel
        .find({ website: 'wiki' })
        .sort({ discount: 1 })
        .exec();
      console.log(Wiki.length);
      return Wiki;
    } catch (error) {
      console.error(error);
    }
  }
  async getPointM(): Promise<Products[]> {
    try {
      const PointM = await this.productsModel
        .find({ website: 'pointm' })
        .sort({ discount: 1 })
        .exec();
      console.log(PointM.length);
      return PointM;
    } catch (error) {
      console.error(error);
    }
  }
  async getProductsBySearch(productName: string): Promise<Products[]> {
    try {
      const searchResults = await this.productsModel
        .find({ name: { $regex: productName, $options: 'i' } })
        .sort({ discount: 1 })
        .exec();
      return searchResults;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to search for products by name.');
    }
  }
}
