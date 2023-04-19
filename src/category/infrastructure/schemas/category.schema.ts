import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Products } from 'src/products/intrastructure/schemas/products.schema';
export type CategoryDocument = Document<Category>;
@Schema()
export class Category {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }] })
  products: Products[];
}
export const CategorySchema = SchemaFactory.createForClass(Category);
