import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Website1 {
  @Field()
  name: string;
  @Field()
  price: number;
  @Field()
  discount: number;
  @Field()
  image: string;
  @Field()
  link: string;
}
