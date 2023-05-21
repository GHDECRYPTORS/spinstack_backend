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
  @Length(1, 8, {
    message:
      "password must be longer than or equal to 1 and shorter than or equal to 8 characters",
  })
  password: string;
}
