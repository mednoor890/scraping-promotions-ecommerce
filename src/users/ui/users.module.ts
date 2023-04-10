import { Module, ValidationPipe } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuards } from '../domain/auth.guard';
import { AuthService } from '../domain/auth.service';
import { UserService } from '../domain/users.service';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { UserSchema } from '../infrastructure/schema/users.schema';
import { UserResolvers } from './resolvers/user-mutation.resolver';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [
    UserService,
    UserResolvers,
    UserRepository,
    AuthGuards,
    AuthService,
    ValidationPipe,
  ],
  exports: [AuthGuards, AuthService],
})
export class UserModule {}
