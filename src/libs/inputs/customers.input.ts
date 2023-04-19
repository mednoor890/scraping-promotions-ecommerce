import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomersInput {
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
