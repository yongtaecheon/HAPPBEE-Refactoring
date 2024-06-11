import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin') //회원가입
  signIn(@Body() userDto: UserDto) {
    return this.userService.signIn(userDto);
  }

  @Post('/login') //로그인
  login(@Body() userDto: UserDto) {
    return this.userService.login(userDto);
  }

  @Get('/exist/:username')
  isUserExsit(@Param('username') username: string) {
    return this.userService.isUserExist(username);
  }

  @Get('/info/:username')
  findAllInfoByUsername(@Param('username') username: string) {
    return this.userService.findAllInfoByUsername(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
