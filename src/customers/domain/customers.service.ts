import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../infrastructure/respositories/customers.repository';
import { Customers } from '../infrastructure/schemas/customers.schema';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}
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
}
