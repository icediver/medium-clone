import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { User } from '../user/decorators/user.decorator';
import { AuthGuard } from '../user/guards/auth.guard';
import { ProfileService } from './profile.service';
import { ProfileResponseInterface } from './types/profileResponse.interface';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @User('id') currentUserId: number,
    @Param('username') ProfileUsername: string
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(
      currentUserId,
      ProfileUsername
    );
    return this.profileService.buildProfileResponse(profile);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async followProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUserName: string
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.followProfile(
      currentUserId,
      profileUserName
    );

    return this.profileService.buildProfileResponse(profile);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  async unfollowProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUserName: string
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.unfollowProfile(
      currentUserId,
      profileUserName
    );

    return this.profileService.buildProfileResponse(profile);
  }
}
