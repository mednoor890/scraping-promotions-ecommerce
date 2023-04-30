import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Website3Service } from '../domain/website3.service';
import { Website3Repository } from '../infrastructure/website3.repository';
import { website3QueriesResolver } from './resolvers/website3-queries.resolver';
import { ProductsSchema } from 'src/products/intrastructure/schemas/products.schema';

@Module({
  imports: [
    //ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
  providers: [Website3Service, website3QueriesResolver, Website3Repository],
})
export class Website3Module {}
