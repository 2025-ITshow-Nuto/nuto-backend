import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      // multer 설정
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
          const ext = extname(file.originalname); 
          const filename = file.originalname.replace(ext, '');
          cb(null, filename+'.png');  
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: '파일 업로드 성공!', filename: file.filename };
  }
}
