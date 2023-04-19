import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductsType } from './products.dto';

@ObjectType()
export class Category {
  @Field(() => ID, { nullable: true })
  _id?: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  description: string;
  @Field(() => [ProductsType], { nullable: true })
  products: ProductsType[];
}
