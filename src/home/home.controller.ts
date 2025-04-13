import { Controller, Get, Param } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get(':boothId')
  getBooth(@Param('boothId') boothId: string) {
    return this.homeService.getBooth(boothId);
  }
}
