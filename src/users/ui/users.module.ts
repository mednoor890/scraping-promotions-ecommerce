import { Module, ValidationPipe } from '@nestjs/common';
//import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuards } from '../domain/auth.guard';
import { AuthService } from '../domain/auth.service';
import { UserService } from '../domain/users.service';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { UserSchema } from '../infrastructure/schema/users.schema';
import { UserResolvers } from './resolvers/user-mutation.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      // useFactory: async (configService: ConfigService) => ({
      //   secret: configService.get('JWT_SECRET'), to do make that variable config really secret
      secret: 'config',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    // }),
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
