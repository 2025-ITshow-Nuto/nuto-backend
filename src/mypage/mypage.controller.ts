import { Body, Controller, Post } from '@nestjs/common';
import { CreateMypageDto } from './dto/mypage.dto';
import { MypageService } from './mypage.service';

@Controller('api/mypage')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Post('send')
  async create(@Body() createMypageDto: CreateMypageDto) {
    // 서비스에서 로직을 처리하도록 위임
    return this.mypageService.create(createMypageDto);
  }
}
