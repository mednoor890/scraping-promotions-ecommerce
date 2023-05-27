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
      const hashed = await hash(customer.password, 10);
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
    // Compare the hashed password in the database to the input password

    const isMatch = await compare(password, user.password);
    return isMatch;
  }
}
