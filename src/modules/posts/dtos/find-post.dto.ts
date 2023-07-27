import { IsUUID } from 'class-validator';

export class FindPostDto {
  @IsUUID(undefined, {
    message: 'Invalid postId',
  })
  postId: string;
}
