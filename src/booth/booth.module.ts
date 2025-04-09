import { Module } from '@nestjs/common';
import { BoothController } from './booth.controller';
import { BoothService } from './booth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booth, BoothSchema } from '../schemas/booth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booth.name, schema: BoothSchema }]),
  ],
  controllers: [BoothController],
  providers: [BoothService],
})
export class BoothModule {}
