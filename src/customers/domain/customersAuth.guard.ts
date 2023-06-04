import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationService } from './customersAuth.service';

@Injectable()
export class AuthCustomersGuards implements CanActivate {
  constructor(private authService: AuthenticationService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = req.headers.authorization;
    if (!token) {
      return false;
    }
    const user = await this.authService.validateToken(token);
    if (!user) {
      return false;
    }
    return true;
  }
}
