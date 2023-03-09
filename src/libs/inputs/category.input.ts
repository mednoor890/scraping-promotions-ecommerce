import { Field, ID, InputType } from '@nestjs/graphql';
import { createInputType } from './products.input';

@InputType()
export class CategoryInput {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => [createInputType], { nullable: true })
  products: createInputType[];
  @Field({ nullable: true })
  description: string;
}
