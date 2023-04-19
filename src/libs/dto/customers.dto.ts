import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomersType {
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
