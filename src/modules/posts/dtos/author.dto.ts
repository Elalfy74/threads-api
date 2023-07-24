import { Expose } from 'class-transformer';

export class AuthorDto {
  @Expose()
  username: string;

  @Expose()
  avatar: string;
}
