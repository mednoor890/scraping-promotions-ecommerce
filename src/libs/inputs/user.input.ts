import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class UserInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  @Length(2, 30)
  firstname: string;
  @Field({ nullable: true })
  @Length(2, 30)
  lastname: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @Length(6, 30)
  password: string;
  @Field({ nullable: true })
  createdAt: string;
  @Field({ nullable: true })
  updatedAt: string;
  @Field({ nullable: true })
  authToken: string;
}
