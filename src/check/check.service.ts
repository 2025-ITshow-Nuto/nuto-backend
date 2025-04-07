import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as deepl from 'deepl-node';

@Injectable()
export class CheckService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async translate_text(text: string): Promise<string> {
    const authKey = this.configService.get<string>('DEEPL_API_KEY') || '';
    const translator = new deepl.Translator(authKey);
    const res = await translator.translateText(text, 'ko', 'en-US');
    return res['text'];
  }

  login(_userid: string, _userpw: string) {
    if (
      _userid === this.configService.get<string>('ADMIN_ID') &&
      _userpw === this.configService.get<string>('ADMIN_PW')
    ) {
      const payload = { id: _userid, pw: _userpw };
      const token = this.jwtService.sign(payload);
      return token;
    }
  }
}
