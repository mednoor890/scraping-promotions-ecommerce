import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CustomersInput {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  image: string;
  @Field({ nullable: true })
  password: string;
}
