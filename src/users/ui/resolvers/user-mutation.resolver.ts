import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { User } from 'src/libs/dto/user.dto';
import { UserInput } from 'src/libs/inputs/user.input';
import { UserService } from 'src/users/domain/users.service';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolvers {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => User)
  async registerUser(@Args('user_details') user: UserInput): Promise<User> {
    const validationErrors = await validate(user);
    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }
    return await this.userService.createUser(user);
  }
  @Mutation(() => User)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return await this.userService.loginUser(email, password);
  }
}
