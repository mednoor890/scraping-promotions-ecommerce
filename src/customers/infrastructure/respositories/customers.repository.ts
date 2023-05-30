import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customers } from '../schemas/customers.schema';
import { compare, hash } from 'bcrypt';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectModel(Customers.name)
    private readonly customersModel: Model<Customers>,
  ) {}
  async findAll(): Promise<Customers[]> {
    return this.customersModel.find().exec();
  }
  async findByCustomerId(_id: string): Promise<Customers> {
    return this.customersModel.findById(_id);
  }
  async findByCustomerName(firstName: string): Promise<Customers> {
    return await this.customersModel.findOne({ firstName: firstName });
  }
  async createCustomer(customer: Customers): Promise<Customers> {
    try {
      const hashed = await hash(customer.password, 18);
      const createdCustomer = new this.customersModel({
        ...customer,
        password: hashed,
      });
      return createdCustomer.save();
    } catch (error) {}
  }
  async updateCustomer(_id, customer: Customers): Promise<Customers> {
    const updatedCustomer = await this.customersModel
      .findByIdAndUpdate(_id, customer)
      .exec();
    return updatedCustomer;
  }
  async deleteCustomer(_id: string): Promise<Customers> {
    const deletedCustomer = await this.customersModel
      .findByIdAndRemove(_id)
      .exec();
    return deletedCustomer;
  }
  async findUserByEmail(email: string): Promise<Customers> {
    if (!email) {
      throw new Error('Invalid email');
    }
    return await this.customersModel.findOne({ email }).exec();
  }

  async verifyUserPassword(
    user: Customers,
    password: string,
  ): Promise<boolean> {
    const isMatch = await compare(password, user.password);
    return isMatch;
  }
  async getCustomerBySearch(name: string): Promise<Customers[]> {
    try {
      const searchResults = await this.customersModel
        .find({ name: { $regex: name, $options: 'i' } })
        .sort({ firstName: 1 })
        .exec();
      return searchResults;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to search for products by name.');
    }
  }
}
