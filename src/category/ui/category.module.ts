import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from '../domain/category.service';
import { CategoryRepository } from '../infrastructure/repositories/category.repository';
import { CategorySchema } from '../infrastructure/schemas/category.schema';
import { CategoriesMutations } from './resolvers/category-mutation.resolver';
import { CategoryQueries } from './resolvers/category-query.resolver';
const CategoryResolvers = [CategoriesMutations, CategoryQueries];
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [CategoryService, ...CategoryResolvers, CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryModule {}
