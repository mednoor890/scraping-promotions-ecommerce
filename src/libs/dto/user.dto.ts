import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  firstname: string;
  @Field({ nullable: true })
  lastname: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  password: string;
  @Field({ nullable: true })
  createdAt: string;
  @Field({ nullable: true })
  updatedAt: string;
  @Field({ nullable: true })
  authToken: string;
}
