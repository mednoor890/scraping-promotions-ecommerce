import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProfileType } from './profile.dto';

@ObjectType()
export class CustomersType {
  @Field(() => ID, { nullable: true })
  _id?: string;
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
  @Field({ nullable: true })
  Token: string;
  @Field(() => ProfileType, { nullable: true })
  profile?: ProfileType;
}
