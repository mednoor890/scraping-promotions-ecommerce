import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Website2 {
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
  @Field()
  price_on_discount: number;
  @Field()
  brand: string;
}
