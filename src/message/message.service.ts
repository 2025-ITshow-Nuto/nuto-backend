import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MessageService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {
    this.transporter = nodemailer.createTransport({
      // SMTP 설정
      host: 'smtp.naver.com', //smtp 호스트
      port: 587,
      auth: {
        user: 'jieyn7@naver.com',
        pass: '2YE54M526UY9',
      },
    });
  }

  async sendMail(to: string, content: string) {
    console.log(to, content);
    try {
      await this.transporter.sendMail({
        from: 'jieyn7@naver.com',
        to,
        subject: 'NUTO Message',
        text: content,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async send_message(
    name: string,
    message: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const createdMessage = new this.messageModel({
        name: name,
        message: message,
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
