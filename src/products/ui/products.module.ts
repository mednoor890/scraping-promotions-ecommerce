import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/ui';
import { UserModule } from 'src/users/ui';
import { ProductsService } from '../domain/products.service';
import { ProductsRepository } from '../intrastructure/repositories/products.repository';
import { ProductsSchema } from '../intrastructure/schemas/products.schema';
import { ProductsMutations } from './resolvers/products-mutation.resolver';
import { ProductsQueries } from './resolvers/products-queries.resolver';
import { CustomersModule } from 'src/customers/ui';
const ProductsResolvers = [ProductsMutations, ProductsQueries];
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
    CategoryModule,
    UserModule,
    CustomersModule,
  ],
  providers: [ProductsService, ...ProductsResolvers, ProductsRepository],
})
export class ProductsModule {}
