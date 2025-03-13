import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as deepl from 'deepl-node';

@Injectable()
export class CheckService {
  constructor(private configService: ConfigService) {}

  async translate_text(text: string): Promise<string> {
    const authKey = this.configService.get<string>('DEEPL_API_KEY') || '';
    const translator = new deepl.Translator(authKey);
    const res = await translator.translateText(text, 'ko', 'en-US');
    return res['text'];
  }
}
