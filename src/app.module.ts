import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { HomeModule } from './home/home.module';
import { BoothModule } from './booth/booth.module';
import { AccountModule } from './account/account.module';
import { MypageModule } from './mypage/mypage.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckController } from './check/check.controller';
import { CheckModule } from './check/check.module';
import { CheckService } from './check/check.service';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MessageModule } from './message/message.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PostModule,
    HomeModule,
    BoothModule,
    AccountModule,
    MypageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    JwtModule.register({
      secret: 'b6dah5wrEr96rMn9OkfOetgRtaSlwrKt',
      signOptions: { expiresIn: '1h' },
    }),
    NestjsFormDataModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://mongo:27017/nuto',
    ),
    CheckModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MessageModule,
  ],
  controllers: [AppController, CheckController],
  providers: [AppService, CheckService],
})
export class AppModule {}
