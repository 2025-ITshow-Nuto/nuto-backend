import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: true } })
export class Message {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
