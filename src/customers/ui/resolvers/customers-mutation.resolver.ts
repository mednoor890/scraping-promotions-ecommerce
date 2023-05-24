import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomersService } from 'src/customers/domain/customers.service';
import { CustomersType } from 'src/libs/dto/customers.dto';
import { CustomersInput } from 'src/libs/inputs/customers.input';

@Resolver()
export class CustomersMutationsResolver {
  constructor(private customersService: CustomersService) {}
  @Mutation(() => CustomersType)
  async createCustomer(
    @Args('customer_detail') customer: CustomersInput,
  ): Promise<CustomersType> {
    return await this.customersService.createCustomer(customer);
  }
  @Mutation(() => CustomersType)
  async deleteCustomer(@Args('id') _id: string): Promise<CustomersType> {
    return await this.customersService.deleteCustomer(_id);
  }
  @Mutation(() => CustomersType)
  async updateCustomer(
    @Args('id') _id: string,
    @Args('customer_detail') customer: CustomersInput,
  ): Promise<CustomersType> {
    return await this.customersService.updateCustomer(_id, customer);
  }
  @Mutation(() => CustomersType)
  async loginCustomer(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<CustomersType> {
    return await this.customersService.loginCustomer(email, password);
  }
}
