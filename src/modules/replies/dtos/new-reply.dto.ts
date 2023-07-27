import { Expose } from 'class-transformer';

export class NewReplyDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;
}
