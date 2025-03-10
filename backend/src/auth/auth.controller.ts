import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { id: string; password: string }) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: { id: string; password: string; name: string }) {
    return this.authService.register(registerDto);
  }
} 