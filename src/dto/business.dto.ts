import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class BusinessDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;
}
