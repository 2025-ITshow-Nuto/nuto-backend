import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async send_message(@Body() data: { name: string; message: string }) {
    return await this.messageService.send_message(data.name, data.message);
  }

  @Get('/:name') // Spring PathVariable이랑 비슷함
  async get_message(@Param('name') name: string) {
    console.log(name);
    return await this.messageService.get_message(name);
  }
}
