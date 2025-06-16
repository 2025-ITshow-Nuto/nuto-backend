import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: { createdAt: true } })
export class Post {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  polariodImage: string;

  @Prop({ required: true })
  nutoImage: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  logoImage: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
