import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request): Promise<boolean> {
    try {
      let token: string;
      if (
        request?.headers?.authorization &&
        request?.headers?.authorization.startsWith('Bearer')
      ) {
        token = request.headers.authorization.replace('Bearer ', '');
      }
      if (!token) {
        throw new UnauthorizedException('Auth token should be provided');
      }

      await this.jwtService.verifyAsync(token);

      const user = this.jwtService.decode(token);

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
