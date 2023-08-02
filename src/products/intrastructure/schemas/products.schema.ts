import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/infrastructure/schemas/category.schema';
export type ProductsDocument = Document<Products>;
@Schema()
export class Products {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  discount: number;
  @Prop()
  price_on_discount: number;
  @Prop()
  image: string;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  quantity: number;
  @Prop()
  availibility: string;
  @Prop()
  brand: string;
  @Prop()
  description: string;
  @Prop()
  link: string;
  @Prop()
  website: string;
  @Prop()
  rating: number[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  /*@Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Website'})
  website: Website;*/
}
export const ProductsSchema = SchemaFactory.createForClass(Products);
