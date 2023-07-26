import { IsUUID } from 'class-validator';

export class FindRepliesDto {
  @IsUUID(undefined, {
    message: 'Invalid postId',
  })
  postId: string;
}
