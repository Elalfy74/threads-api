import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from 'src/shared/guards';
import { Serialize } from 'src/shared/interceptors';
import { ISession } from 'src/shared/interfaces';

import { PostsService } from './posts.service';
import { CreatePostDto, PostDto } from './dtos';
import { GetUser } from 'src/shared/decorators';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() session: ISession,
  ) {
    return this.postsService.create(createPostDto, file, session);
  }

  @Get()
  @Serialize(PostDto)
  find(@GetUser() session: ISession) {
    return this.postsService.find(session);
  }
}
