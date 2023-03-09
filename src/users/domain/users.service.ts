import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { User } from '../infrastructure/schema/users.schema';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(user: User): Promise<User> {
    try {
      return await this.userRepository.createUser(user);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
  //async findOne(user: User): Promise<User> {}
  async loginUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    const result = await this.userRepository.verifyUserPassword(user, password);
    if (!user) {
      throw new Error('Invalid email');
    }
    if (!result) {
      throw new Error('Invalid password');
    }
    const payload = { sub: user._id };
    const token = this.jwtService.sign(payload);
    return { ...user, authToken: token };
  }
}
