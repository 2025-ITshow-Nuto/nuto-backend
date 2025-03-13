import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoothService } from './booth.service';
import { Booth } from '../schemas/booth.schema';

@Controller('booth')
export class BoothController {
  constructor(private readonly boothService: BoothService) {}

  @Post()
  async create(@Body() booth: Booth): Promise<Booth> {
    return this.boothService.create(booth);
  }

  @Get()
  async findAll(): Promise<Booth[]> {
    return this.boothService.findAll();
  }
}
