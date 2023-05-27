import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsEmail,
  IsNumber,
  IsIn,
  IsUrl,
  IsObject,
  ValidateNested,
  IsNumberString,
} from "class-validator";

import { Type } from "class-transformer";

export class OrderDto {
  @IsNotEmpty()
  tx_ref: string;

  @IsNumberString()
  amount_in_wei: number;

  @IsIn(["ETH"])
  currency: "ETH";

  @IsUrl()
  @IsOptional()
  redirect_url?: string;

  @IsObject()
  @IsOptional()
  meta?: Record<string, any>;

  @IsEmail()
  customer_email: string;

  @IsNotEmpty()
  customer_name: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}


