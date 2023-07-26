import { IsOptional, IsString, IsUrl, Length, Matches } from 'class-validator';

export class RegisterDto {
  @Matches(/^[a-z][a-z0-9_]{3,20}$/, {
    message:
      'Usernames must start with a letter and has a length between 4 and 20 characters. Allowed characters are a-z, 0-9, and _',
  })
  username: string;

  @IsString()
  @Length(6, 225)
  password: string;

  @IsUrl()
  @IsOptional()
  avatar: string;
}
