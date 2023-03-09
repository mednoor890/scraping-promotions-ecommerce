import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CategoryService } from 'src/category/domain/category.service';
import { Category } from 'src/libs/dto/category.dto';
import { CategoryInput } from 'src/libs/inputs/category.input';

@Resolver((of) => Category)
export class CategoriesMutations {
  constructor(private categoryService: CategoryService) {}
  @Mutation(() => Category)
  async createCategory(
    @Args('category_details') category: CategoryInput,
  ): Promise<Category> {
    return await this.categoryService.createCategory(category);
  }
  @Mutation(() => Category)
  async updateCategory(
    @Args('id') _id: string,
    @Args('category') category: CategoryInput,
  ): Promise<Category> {
    const updatedProduct = await this.categoryService.updateCategory(
      _id,
      category,
    );
    return updatedProduct;
  }
  @Mutation(() => Category)
  async deleteCategory(@Args('id') _id: string): Promise<Category> {
    const deletedProduct = await this.categoryService.deleteCategory(_id);
    return deletedProduct;
  }
}
