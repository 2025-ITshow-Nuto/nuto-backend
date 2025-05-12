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

  async check_available(
    text: string,
  ): Promise<{ message: string; status: number; label?: string }> {
    const apiKey = this.configService.get<string>('HUGGING_FACE_API_KEY');
    const url =
      'https://router.huggingface.co/hf-inference/models/SamLowe/roberta-base-go_emotions';

    const data = {
      inputs: text,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as Array<
        { label: string; score: number }[]
      >;

      return {
        message: 'success to call hugging face api',
        status: 200,
        label: JSON.stringify(result[0][0]),
      };
    } catch (err) {
      return {
        message: 'fail to call hugging face api ' + err,
        status: 500,
      };
    }
  }

  login(
    _userid: string,
    _userpw: string,
  ): { success: boolean; token?: string } {
    console.log(
      this.configService.get<string>('ADMIN_ID'),
      this.configService.get<string>('ADMIN_PW'),
    );
    if (
      _userid === this.configService.get<string>('ADMIN_ID') &&
      _userpw === this.configService.get<string>('ADMIN_PW')
    ) {
      const payload = { id: _userid, pw: _userpw };
      const token = this.jwtService.sign(payload);
      return { success: true, token: token };
    } else {
      return { success: false };
    }
  }
}
