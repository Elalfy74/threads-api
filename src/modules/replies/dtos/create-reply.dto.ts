import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateReplyDto {
  @IsUUID(undefined, {
    message: 'Invalid postId',
  })
  postId: string;

  @IsString()
  @MinLength(2)
  content: string;
}
