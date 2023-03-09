import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../schema/users.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async createUser(user: User): Promise<User> {
    try {
      const hashedPassword = await hash(user.password, 10);
      const createdProduct = new this.userModel({
        ...user,
        password: hashedPassword,
      });
      return createdProduct.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    if (!email) {
      throw new Error('Invalid email');
    }
    return await this.userModel.findOne({ email }).exec();
  }

  async verifyUserPassword(user: User, password: string): Promise<boolean> {
    // Compare the hashed password in the database to the input password

    const isMatch = await compare(password, user.password);
    return isMatch;
  }
}
