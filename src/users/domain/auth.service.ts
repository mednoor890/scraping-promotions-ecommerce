import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async validateToken(token: string): Promise<any> {
    try {
      console.log('Decoding token:', token);
      const decoded = this.jwtService.verify(token);
      console.log(decoded);
      return decoded;
    } catch (err) {
      throw new Error(`Invalid token: ${err.message}`);
    }
  }
}
