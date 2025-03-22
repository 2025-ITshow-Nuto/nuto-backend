import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type BoothDocument = mongoose.HydratedDocument<Booth>;

@Schema()
export class Booth {
  @Prop({required: true})
  booth_id : string 

  @Prop()
  members: string[]
}

export const BoothSchema = SchemaFactory.createForClass(Booth);