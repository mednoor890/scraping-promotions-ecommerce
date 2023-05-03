import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from 'src/products/intrastructure/schemas/products.schema';
import { Website2Service } from '../domain/website2.service';
import { wesbite2QueriesResolver } from './resolvers/website2-queries.resolver';
import { Website2Repository } from '../infrastructure/repository/website2.repository';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
  providers: [Website2Service, wesbite2QueriesResolver, Website2Repository],
})
export class Website2Module {}
