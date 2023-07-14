import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProfileType {
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
}
