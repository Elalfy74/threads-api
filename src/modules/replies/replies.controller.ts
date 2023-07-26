import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ISession } from 'src/shared/interfaces';
import { JwtAuthGuard } from 'src/shared/guards';
import { GetUser } from 'src/shared/decorators';

import { RepliesService } from './replies.service';
import { CreateReplyDto, FindRepliesDto } from './dtos';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateReplyDto, @GetUser() user: ISession) {
    return this.repliesService.create(dto, user.userId);
  }

  @Get(':postId')
  find(@Param() param: FindRepliesDto) {
    return this.repliesService.find(param.postId);
  }
}
