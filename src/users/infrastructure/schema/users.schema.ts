import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type UserDocument = Document<User>;
@Schema()
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  })
  _id: string;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  createdAt: string;
  @Prop()
  updatedAt: string;
  @Prop()
  authToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
