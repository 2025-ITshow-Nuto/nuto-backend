import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  polariodImage?: string; // S3 업로드 후 추가되기 때문에 ?로 처리

  nutoImage?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  password: number;

  @IsString()
  @IsNotEmpty()
  logoImage: string;
}
