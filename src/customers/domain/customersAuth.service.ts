import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {}
  async validateToken(customerToken: string): Promise<any> {
    try {
      console.log('Decoding Customer token:', customerToken);
      const decoded = this.jwtService.verify(customerToken);
      console.log(decoded);
      return decoded;
    } catch (err) {
      throw new Error(`Invalid token: ${err.message}`);
    }
  }
}
