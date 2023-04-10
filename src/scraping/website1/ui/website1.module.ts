import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from '../../../products/intrastructure/schemas/products.schema';
import { Website1Repository } from '../infrastructure/repositories/website1.repository';
import { Website1Service } from '../domain/website1.service';
import { wesbite1MutationsResolver } from './resolvers/website1-queries.resolver';
import { ConfigModule } from '@nestjs/config';

//const Website1Resolvers = [wesbite1MutationsResolver];
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
  providers: [Website1Service, wesbite1MutationsResolver, Website1Repository],
})
export class Website1Module {}
