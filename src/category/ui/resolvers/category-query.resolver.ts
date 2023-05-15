import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from 'src/category/domain/category.service';
import { Category } from 'src/libs/dto/category.dto';
@Resolver()
export class CategoryQueries {
  constructor(private categoryService: CategoryService) {}
  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }
  @Query(() => Category)
  async getCategory(
    @Args('_id', { type: () => String }) _id: string,
  ): Promise<Category> {
    return await this.categoryService.findById(_id);
  }
}
