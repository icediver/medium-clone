import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Repository } from "typeorm";
import { JWT_SECRET } from "../config";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }
  
  //------------Create-------------------
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = { errors: {} };
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });
    const userByUserName = await this.userRepository.findOne({
      where: {
        username: createUserDto.username
      }
    });
    if (userByEmail) {
      errorResponse.errors["email"] = "has already taken";
    }
    if (userByUserName) {
      errorResponse.errors["username"] = "has already taken";
    }
    
    if (userByEmail || userByUserName) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }
  
  //------------Read---------------------
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const errorResponse = { errors: { "email or password": "is invalid" } };
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email
      },
      select: ["id", "username", "email", "bio", "image", "password"]
    });
    if (!user) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isValidPassword = await compare(loginUserDto.password, user.password);
    if (!isValidPassword) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    delete user.password;
    
    return user;
  }
  
  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }
  
  //------------Update-------------------
  async updateUser(
    updateUserDto: UpdateUserDto,
    currentUserId: number
  ): Promise<UserEntity> {
    const user = await this.findById(currentUserId);
    // if (updateUserDto.password || updateUserDto.password !== "") {
    //   updateUserDto.password = await hash(updateUserDto.password, 10);
    //   ;
    // }
    
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }
  
  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username
      },
      JWT_SECRET
    );
  }
  
  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      }
    };
  }
}
