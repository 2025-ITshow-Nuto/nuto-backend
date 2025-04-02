import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async send_message(@Body() name: string, @Body() message: string) {
    return await this.messageService.send_message(name, message);
  }

  @Get()
  async get_message(@Body() name: string) {
    return await this.messageService.get_message(name);
  }
}
