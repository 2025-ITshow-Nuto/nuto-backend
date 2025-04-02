import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

export const s3Factory = (configService: ConfigService) => {
  return new AWS.S3({
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    region: configService.get<string>('AWS_REGION'),
  });
};

export const multerS3Options = (s3: S3, bucketName: string): multerS3 => {
  return multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  });
};
