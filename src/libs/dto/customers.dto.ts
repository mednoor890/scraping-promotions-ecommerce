import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomersType {
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
