import { Field, ID, InputType, Int } from '@nestjs/graphql';
//import { Category } from '../dto/category.dto';
import { CategoryInput } from './category.input';
import { IsInt, Max, Min } from 'class-validator';

@InputType()
export class createInputType {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => [Int], { nullable: true }) // Rating is now an array of numbers
  @IsInt({ each: true }) // Validate each element in the array is an integer
  @Min(1, { each: true }) // Validate each element in the array is at least 1
  @Max(5, { each: true }) // Validate each element in the array is at most 5
  rating: number[];
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
