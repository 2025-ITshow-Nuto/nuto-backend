import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booth, BoothDocument } from '../schemas/booth.schema';

@Injectable()
export class BoothService {
  constructor(
    @InjectModel(Booth.name) private boothModel: Model<BoothDocument>,
  ) {}

  async create(booth_id: string, members: string[]): Promise<Booth> {
    const createdBooth = new this.boothModel({ 
      booth_id ,
      members,
    });
    return await createdBooth.save();
  }

  async findOne(booth_id: string): Promise<Booth[] | null> {
    return await this.boothModel.find({booth_id: {$regex: booth_id, $options: 'i'}}).exec();
  }

  async findAll(): Promise<Booth[]> {
    return await this.boothModel.find().exec();
  }

  async delete(booth_id) {
    return await this.boothModel.findOneAndDelete({booth_id}).exec();
  }
}
