import { Expose, Transform, Type } from 'class-transformer';
import { AuthorDto } from './author.dto';

export class PostDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  imageUrl: string;

  @Expose()
  username: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj._count.replies)
  repliesCount: number;

  @Expose()
  @Transform(({ obj }) => obj._count.likes)
  likesCount: number;

  @Expose({ name: 'likes' })
  @Transform(({ value }) => value.length > 0)
  userHasLiked: boolean;

  @Type(() => AuthorDto)
  @Expose()
  user: AuthorDto;
}
