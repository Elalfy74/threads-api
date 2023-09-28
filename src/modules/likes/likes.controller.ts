import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/shared/guards';
import { GetUser } from 'src/shared/decorators';
import { ISession } from 'src/shared/interfaces';

import { LikesService } from './likes.service';
import { CreateLikeDto, RemoveLikeDto } from './dtos';

@Controller('likes')
@ApiTags('Likes')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @GetUser() session: ISession) {
    return this.likesService.create(createLikeDto, session.userId);
  }

  @Delete(':postId')
  remove(@Param() param: RemoveLikeDto, @GetUser() session: ISession) {
    return this.likesService.remove(param, session.userId);
  }
}
