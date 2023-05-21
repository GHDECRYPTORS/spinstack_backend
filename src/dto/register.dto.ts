import { IsNotEmpty, Length, IsEmail } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 256, {
    message: "password must be at least 8 characters",
  })
  password: string;

  @IsNotEmpty()
  full_name: string;
}
