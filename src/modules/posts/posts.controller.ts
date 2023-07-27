import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from 'src/shared/guards';
import { Serialize } from 'src/shared/interceptors';
import { ISession } from 'src/shared/interfaces';
import { GetUser } from 'src/shared/decorators';

import { PostsService } from './posts.service';
import { ImageSize } from './image-size.pipe';
import {
  CreatePostDto,
  FindPostDto,
  PostDto,
  PostWithRepliesDto,
} from './dtos';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new ImageSize()],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @GetUser() session: ISession,
  ) {
    return this.postsService.create(createPostDto, file, session);
  }

  @Get()
  @Serialize(PostDto)
  find(@GetUser() session: ISession) {
    return this.postsService.find(session);
  }

  @Get(':postId')
  @Serialize(PostWithRepliesDto)
  findOne(@Param() param: FindPostDto, @GetUser() session: ISession) {
    return this.postsService.findOne(param, session);
  }
}
