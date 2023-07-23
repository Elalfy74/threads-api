import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(2, 50)
  username: string;

  @IsString()
  @Length(6, 225)
  password: string;

  @IsUrl()
  @IsOptional()
  avatar: string;
}
