import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async send_message(
    name: string,
    message: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const createdMessage = new this.messageModel({
        name,
        message,
      });
      await createdMessage.save();
    } catch (error) {
      return { success: false, message: 'Fail to send message : ' + error };
    }
    return { success: true, message: 'Message sent successful' };
  }

  async get_message(
    name: string,
  ): Promise<{ success: boolean; message: string; data?: Message[] }> {
    try {
      const messages = await this.messageModel.find({ name: name }).exec();
      return {
        success: true,
        message: 'Message found successful',
        data: messages,
      };
    } catch (error) {
      return { success: false, message: 'Fail to found message : ' + error };
    }
  }
}
