import { Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';

export class AuthResponseDto {
  @Expose()
  accessToken: string;

  @Type(() => UserDto)
  @Expose()
  user: UserDto;
}
