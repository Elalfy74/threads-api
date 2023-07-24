import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';

import { CreateLikeDto, RemoveLikeDto } from './dtos';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  create(createLikeDto: CreateLikeDto, userId: string) {
    return this.prisma.like.create({
      data: {
        ...createLikeDto,
        userId,
      },
    });
  }

  remove(removeLikeDto: RemoveLikeDto, userId: string) {
    return this.prisma.like.delete({
      where: {
        userId_postId: {
          postId: removeLikeDto.postId,
          userId,
        },
      },
    });
  }
}
