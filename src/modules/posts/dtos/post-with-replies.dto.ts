import { Expose, Type } from 'class-transformer';
import { PostDto } from './post.dto';
import { AuthorDto } from './author.dto';

export class PostWithRepliesDto extends PostDto {
  @Type(() => ReplyDto)
  @Expose()
  replies: ReplyDto[];
}

class ReplyDto {
  @Expose()
  id: string;
  @Expose()
  content: string;
  @Expose()
  createdAt: Date;

  @Type(() => AuthorDto)
  @Expose()
  user: AuthorDto;
}
