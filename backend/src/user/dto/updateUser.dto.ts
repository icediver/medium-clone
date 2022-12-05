import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @Optional()
  @IsString()
  username: string;
  
  @Optional()
  @IsEmail()
  email: string;
  
  @Optional()
  @IsString()
  bio: string;
  
  @Optional()
  @IsString()
  image: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
}
