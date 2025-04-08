import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Message, MessageSchema } from '../schemas/message.schema';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]), // 모델 등록
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'stmp.naver.com',
          port: 587,
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        defaults: {
          from: `'TaeHyeongBNB' <${process.env.EMAIL_ADDRESS}>`, //보낸사람
        },
      }),
    }),
    ConfigModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
