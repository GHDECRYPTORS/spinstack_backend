import { IsNotEmpty } from "class-validator";

export class AppDto {
  @IsNotEmpty()
  name: string;

}
