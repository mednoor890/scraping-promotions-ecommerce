import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersService } from '../domain/customers.service';
import { CustomersRepository } from '../infrastructure/respositories/customers.repository';
import { CustomersSchema } from '../infrastructure/schemas/customers.schema';
import { CustomersMutationsResolver } from './resolvers/customers-mutation.resolver';
import { CustomersQueriesResolver } from './resolvers/customers-queries.resolver';
const CustomersResolvers = [
  CustomersMutationsResolver,
  CustomersQueriesResolver,
];
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customers', schema: CustomersSchema }]),
  ],
  providers: [CustomersService, ...CustomersResolvers, CustomersRepository],
})
export class CustomersModule {}
