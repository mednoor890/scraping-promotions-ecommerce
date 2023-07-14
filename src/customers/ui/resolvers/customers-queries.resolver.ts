import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomersService } from 'src/customers/domain/customers.service';
import { CustomersType } from 'src/libs/dto/customers.dto';
import { ProfileType } from 'src/libs/dto/profile.dto';

@Resolver()
export class CustomersQueriesResolver {
  constructor(private customersService: CustomersService) {}
  @Query(() => [CustomersType])
  async getCustomers(): Promise<CustomersType[]> {
    return this.customersService.findAllCustomers();
  }
  @Query(() => ProfileType)
  async getCustomer(@Args('id') _id: string): Promise<ProfileType> {
    return await this.customersService.findByCustomerId(_id);
  }
  @Query(() => CustomersType)
  async getCustomerByName(
    @Args('name') firstName: string,
  ): Promise<CustomersType> {
    return await this.customersService.findByCustomerName(firstName);
  }
  @Query(() => [CustomersType])
  async getCustomerBySearch(
    @Args('name') name: string,
  ): Promise<CustomersType[]> {
    return await this.customersService.getCustomerBySearch(name);
  }
  /* @Query(() => ProfileType)
  async getProfile(): Promise<ProfileType> {
    return await this.customersService.getProfile();
  }*/
}
