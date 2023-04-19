import { Field, ID, InputType } from '@nestjs/graphql';
//import { Category } from '../dto/category.dto';
import { CategoryInput } from './category.input';

@InputType()
export class createInputType {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  price: number;
  @Field({ nullable: true })
  discount: number;
  @Field({ nullable: true })
  image: string;
  @Field({ nullable: true })
  price_on_discount: number;
  @Field({ nullable: true })
  link: string;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  brand: string;
  @Field({ nullable: true })
  quantity: number;
  @Field({ nullable: true })
  startDate: Date;
  @Field({ nullable: true })
  endDate: Date;
  @Field({ nullable: true })
  availibility: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  website: string;
  @Field(() => CategoryInput, { nullable: true })
  category: CategoryInput;
}
