import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booth, BoothDocument } from 'src/schemas/booth.schema';

@Injectable()
export class HomeService {
    constructor(@InjectModel(Booth.name) private boothModel: Model<BoothDocument>) {}

    async getBooth(boothId : string){
        return this.boothModel.findById({boothId}).exec();
    }
}
