import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { CreatePostDto } from './dto/post.dto';
import { CreateCommentDto } from './dto/comment.dto';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Types } from 'mongoose';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private configService: ConfigService,
  ) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'ap-northeast-2',
    });
    this.s3 = new AWS.S3();
    this.bucketName =
      this.configService.get<string>('AWS_S3_BUCKET_NAME') || 'it-show-nuto';
  }

  async fileUpload(
    createPostDto: CreatePostDto,
    files: Express.Multer.File[],
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (files.length !== 2) {
        throw new InternalServerErrorException(
          'Exactly two files are required',
        );
      }

      const timestamp = Date.now();
      const fileUrls = {};

      for (const file of files) {
        const folderName = file.fieldname === 'nutoImage' ? 'nuto' : 'polariod';
        const key = `image/${folderName}/${timestamp}-${file.originalname}`;

        const uploadParams = {
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uploadResult = await this.s3.upload(uploadParams).promise();
        fileUrls[folderName] = uploadResult.Location;
      }

      // console.log(fileUrls, createPostDto);

      const newPost = new this.postModel({
        ...createPostDto,
        nutoImage: fileUrls['nuto'] as string,
        polariodImage: fileUrls['polariod'] as string,
      });

      await newPost.save();
      return { success: true, message: 'Post uploaded successfully' };
    } catch (error) {
      console.error('Error uploading images to S3:', error);
      throw new InternalServerErrorException('Failed to upload images');
    }
  }

  async uploadComment(createCommentDto: CreateCommentDto) {
    const newComment = new this.commentModel({
      ...createCommentDto,
      postId: new Types.ObjectId(createCommentDto['postId']),
    });

    await newComment.save();
  }

  async getComment(postId: string): Promise<{
    success: boolean;
    message: string;
    comments?: { comment: string; name: string; createdAt: Date }[];
  }> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new NotFoundException('Invalid postId');
    }

    const objectIdPostId = new Types.ObjectId(postId);
    const comments = await this.commentModel
      .find({ postId: objectIdPostId })
      .exec();

    console.log(comments);

    if (comments.length > 0) {
      return {
        success: true,
        message: 'Successfully found comments',
        comments: comments.map((comment) => ({
          comment: comment.comment,
          name: comment.name ?? '익명',
          createdAt: comment.createdAt,
        })),
      };
    } else {
      return {
        success: false,
        message: 'Failed to find comments',
      };
    }
  }

  async delete(
    id: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    } else {
      console.log(post, password === post.password);
      if (post.password === password) {
        const polariodKey = post.polariodImage.split('.com/')[1];
        const nutoKey = post.nutoImage.split('.com/')[1];

        // S3에서 이미지 삭제
        try {
          await this.s3
            .deleteObject({
              Bucket: this.bucketName,
              Key: polariodKey,
            })
            .promise();

          await this.s3
            .deleteObject({
              Bucket: this.bucketName,
              Key: nutoKey,
            })
            .promise();
        } catch (error) {
          console.error('Error deleting image from S3:', error);
          throw new InternalServerErrorException(
            'Failed to delete image from S3',
          );
        }

        await this.postModel.findByIdAndDelete(id);
        return {
          success: true,
          message: 'Post and image deleted successfully',
        };
      } else {
        return {
          success: false,
          message: 'Post Password not matched',
        };
      }
    }
  }

  async getPost(postId: string): Promise<Post> {
    try {
      const post = await this.postModel.findById(postId).exec();
      if (!post) {
        throw new NotFoundException(`Post ${postId} not found`);
      }
      return post;
    } catch (error) {
      throw new Error('Failed to fetch posts' + error);
    }
  }

  async getAllPosts(): Promise<Post[]> {
    try {
      const posts: Post[] = await this.postModel
        .find({})
        .sort({ createdAt: -1 });
      console.log(posts);
      return posts;
    } catch (error) {
      throw new Error('Failed to fetch posts' + error);
    }
  }

  async getBoothPosts(boothId: string): Promise<{ data: Post[] }> {
    try {
      const posts: Post[] = await this.postModel.find({
        location: { $regex: new RegExp(`^${boothId}$`, 'i') }
      });
      console.log(posts);
      return { data: posts };
    } catch (error) {
      throw new Error('Failed to fetch posts' + error);
    }
  }
}
