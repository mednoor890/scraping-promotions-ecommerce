import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersService } from '../domain/customers.service';
import { CustomersRepository } from '../infrastructure/respositories/customers.repository';
import { CustomersSchema } from '../infrastructure/schemas/customers.schema';
import { CustomersMutationsResolver } from './resolvers/customers-mutation.resolver';
import { CustomersQueriesResolver } from './resolvers/customers-queries.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AuthCustomersGuards } from '../domain/customersAuth.guard';
import { AuthenticationService } from '../domain/customersAuth.service';
const CustomersResolvers = [
  CustomersMutationsResolver,
  CustomersQueriesResolver,
];
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customers', schema: CustomersSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [
    CustomersService,
    ...CustomersResolvers,
    CustomersRepository,
    AuthCustomersGuards,
    AuthenticationService,
  ],
  exports: [AuthCustomersGuards, AuthenticationService],
})
export class CustomersModule {}
