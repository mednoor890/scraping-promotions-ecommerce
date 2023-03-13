import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomersService } from 'src/customers/domain/customers.service';
import { CustomersType } from 'src/libs/dto/customers.dto';

//queries
@Resolver()
export class CustomersQueriesResolver {
  constructor(private customersService: CustomersService) {}
  @Query(() => [CustomersType])
  async getCustomers(): Promise<CustomersType[]> {
    return this.customersService.findAllCustomers();
  }
  @Query(() => CustomersType)
  async getCustomer(@Args('id') _id: string): Promise<CustomersType> {
    return await this.customersService.findByCustomerId(_id);
  }
  @Query(() => CustomersType)
  async getCustomerByName(
    @Args('name') firstName: string,
  ): Promise<CustomersType> {
    return await this.customersService.findByCustomerName(firstName);
  }
}
