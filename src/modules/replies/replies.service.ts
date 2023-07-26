import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { CreateReplyDto } from './dtos';

@Injectable()
export class RepliesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReplyDto, userId: string) {
    return this.prisma.reply.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  find(postId: string) {
    return this.prisma.reply.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
