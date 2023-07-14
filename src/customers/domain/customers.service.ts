import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../infrastructure/respositories/customers.repository';
import { Customers } from '../infrastructure/schemas/customers.schema';
import { JwtService } from '@nestjs/jwt';
import { CustomersType } from 'src/libs/dto/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    private customersRepository: CustomersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async findAllCustomers() {
    return await this.customersRepository.findAll();
  }
  async findByCustomerId(_id: string) {
    return await this.customersRepository.findByCustomerId(_id);
  }
  async findByCustomerName(firstName: string) {
    return await this.customersRepository.findByCustomerName(firstName);
  }
  async createCustomer(customer: Customers): Promise<Customers> {
    return await this.customersRepository.createCustomer(customer);
  }
  async updateCustomer(_id: string, customers: Customers): Promise<Customers> {
    return await this.customersRepository.updateCustomer(_id, customers);
  }
  async deleteCustomer(_id: string): Promise<Customers> {
    return await this.customersRepository.deleteCustomer(_id);
  }
  async getCustomerBySearch(name: string): Promise<Customers[]> {
    return await this.customersRepository.getCustomerBySearch(name);
  }
  async loginCustomer(email: string, password: string): Promise<CustomersType> {
    const user = await this.customersRepository.findUserByEmail(email);
    const result = await this.customersRepository.verifyUserPassword(
      user,
      password,
    );
    if (!user) {
      throw new Error('Invalid email');
    }
    if (!result) {
      throw new Error('Invalid password');
    }
    const payload = { sub: user._id };
    const profile = await this.findByCustomerId(user._id);
    const token = this.jwtService.sign(payload);

    const customersType = new CustomersType();
    customersType._id = user._id;
    customersType.firstName = user.firstName;
    customersType.lastName = user.lastName;
    customersType.email = user.email;
    customersType.image = user.image;
    customersType.password = user.password;
    customersType.Token = token;
    customersType.profile = profile;

    return customersType;
  }
}
