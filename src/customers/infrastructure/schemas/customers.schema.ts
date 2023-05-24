import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomersDocument = Document<Customers>;

@Schema()
export class Customers {
  @Prop()
  _id: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  image: string;
  @Prop()
  password: string;
  @Prop()
  Token: string;
  /*@Prop()
    comment:string or a particular type ;*/
}
export const CustomersSchema = SchemaFactory.createForClass(Customers);
