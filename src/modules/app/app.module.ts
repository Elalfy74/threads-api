import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/shared/modules/prisma/prisma.module';
import { TokenModule } from 'src/shared/modules/token/token.module';

import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TokenModule,
    AuthModule,
    PostsModule,
    LikesModule,
  ],
})
export class AppModule {}
