import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BoothService } from './booth.service';
import { Booth } from '../schemas/booth.schema';

@Controller('booth')
export class BoothController {
  constructor(private readonly boothService: BoothService) {}

  @Post()
  async create(
    @Body('booth_id') booth_id: string,
    @Body('members') members: string[],
  ): Promise<Booth> {
    return this.boothService.create(booth_id, members);
  }

  @Get(':booth_id')
  async findOne(@Param('booth_id') booth_id: string): Promise<Booth[] | null> {
    return this.boothService.findOne(booth_id);
  }

  @Get()
  async findAll(): Promise<Booth[]> {
    return this.boothService.findAll();
  }

  @Delete(':booth_id')
  async delete(@Param('booth_id') booth_id: string) {
    return this.boothService.delete(booth_id);
  }
}
