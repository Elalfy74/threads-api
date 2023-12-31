import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/shared/modules/prisma/prisma.module';
import { TokenModule } from 'src/shared/modules/token/token.module';
import { deserializeUser } from 'src/shared/middleware/deserialize-user.middleware';

import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { LikesModule } from '../likes/likes.module';
import { RepliesModule } from '../replies/replies.module';

import { AppController } from './app.controller';

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
    RepliesModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(deserializeUser).forRoutes(
      { path: 'posts/*', method: RequestMethod.GET },
      {
        path: 'posts',
        method: RequestMethod.GET,
      },
    );
  }
}
