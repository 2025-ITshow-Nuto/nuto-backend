import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booth, BoothDocument } from '../schemas/booth.schema';

@Injectable()
export class BoothService {
  constructor(
    @InjectModel(Booth.name) private boothModel: Model<BoothDocument>,
  ) {}

  async create(booth: Booth): Promise<Booth> {
    const createdBooth = new this.boothModel(booth);
    return createdBooth.save();
  }

  async findAll(): Promise<Booth[]> {
    return this.boothModel.find().exec();
  }
}
