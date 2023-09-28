import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ISession } from 'src/shared/interfaces';
import { JwtAuthGuard } from 'src/shared/guards';
import { GetUser } from 'src/shared/decorators';
import { Serialize } from 'src/shared/interceptors';

import { RepliesService } from './replies.service';
import { CreateReplyDto, NewReplyDto, FindRepliesDto } from './dtos';

@Controller('replies')
@ApiTags('Replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Serialize(NewReplyDto)
  create(@Body() dto: CreateReplyDto, @GetUser() user: ISession) {
    return this.repliesService.create(dto, user.userId);
  }

  @Get(':postId')
  find(@Param() param: FindRepliesDto) {
    return this.repliesService.find(param.postId);
  }
}
