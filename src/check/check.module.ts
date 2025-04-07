import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: 'b6dah5wrEr96rMn9OkfOetgRtaSlwrKt',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CheckController],
  providers: [CheckService],
})
export class CheckModule {}
