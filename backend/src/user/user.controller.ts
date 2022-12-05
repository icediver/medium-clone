import { Body, Controller, Get, HttpCode, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import { BackendValidationPipe } from "../shared/pipes/backendValidation.pipe";
import { User } from "./decorators/user.decorator";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { AuthGuard } from "./guards/auth.guard";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  
  @Post("users")
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body("user") createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
  
  @UsePipes(new BackendValidationPipe())
  @HttpCode(200)
  @Post("login")
  async login(
    @Body("user") loginUserDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
  
  @Get("user")
  @UseGuards(AuthGuard)
  async currentUser(
    @User() user: UserEntity,
    @User("id") currentUserId: number
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
  
  @Put("user")
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User("id") currentUserId: number,
    @Body("user") updateUserDto: UpdateUserDto
  ): Promise<UserResponseInterface> {
    const newUser = await this.userService.updateUser(
      updateUserDto,
      currentUserId
    );
    return this.userService.buildUserResponse(newUser);
  }
}
