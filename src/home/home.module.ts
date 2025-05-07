import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booth, BoothSchema } from 'src/schemas/booth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booth.name, schema: BoothSchema }]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
