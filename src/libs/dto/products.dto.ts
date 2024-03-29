import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Category } from './category.dto';

@ObjectType()
export class ProductsType {
  @Field(() => ID)
  _id?: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  price: number;
  @Field({ nullable: true })
  discount: number;
  @Field({ nullable: true })
  price_on_discount: number;
  @Field({ nullable: true })
  image: string;
  @Field({ nullable: true })
  startDate: Date;
  @Field({ nullable: true })
  endDate: Date;
  @Field({ nullable: true })
  quantity: number;
  @Field(() => [Int], { nullable: true }) // Rating is now an array of numbers
  rating: number[];
  @Field({ nullable: true })
  availibility: string;
  @Field({ nullable: true })
  brand: string;
  @Field({ nullable: true })
  link: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  website: string;
  @Field(() => Category, { nullable: true })
  category: Category;
}
