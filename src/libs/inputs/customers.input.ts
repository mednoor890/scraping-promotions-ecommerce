import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomersInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  image: string;
  @Field()
  password: string;
}
