import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsSchema } from 'src/products/intrastructure/schemas/products.schema';
import { Website5Service } from '../domain/website5.service';
import { website5QueriesResolver } from './resolvers/website5-queries.resolver';
import { Website5Repository } from '../infrastructure/repository/website5.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
  providers: [Website5Service, website5QueriesResolver, Website5Repository],
})
export class Website5Module {}
