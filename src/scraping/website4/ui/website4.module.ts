import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsSchema } from 'src/products/intrastructure/schemas/products.schema';
import { Website4Service } from '../domain/website4.service';
import { website4QueriesResolver } from './resolvers/website4-queries.resolver';
import { Website4Repository } from '../infrastructure/repository/website4.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
  providers: [Website4Service, website4QueriesResolver, Website4Repository],
})
export class Website4Module {}
