import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsEmail,
} from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 256, {
    message: "password must be at least 8 characters",
  })
  password: string;
}
