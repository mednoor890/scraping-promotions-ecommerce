import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CustomersDocument = Document<Customers>;

@Schema()
export class Customers {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  })
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
