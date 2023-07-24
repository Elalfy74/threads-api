import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';

import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { ISession } from 'src/shared/interfaces';

import { CloudinaryService } from './cloudinary.service';
import { CreatePostDto } from './dtos';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
    session: ISession,
  ) {
    let uploadedImg: UploadApiResponse;

    if (file) {
      uploadedImg = await this.cloudinary.uploadImage(file);
    }

    return this.prisma.post.create({
      data: {
        ...createPostDto,
        userId: session.userId,
        imageUrl: uploadedImg?.url,
      },
    });
  }

  async find(session: ISession) {
    return this.prisma.post.findMany({
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        likes: {
          where: {
            userId: session?.userId || 'Not Valid Value',
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
