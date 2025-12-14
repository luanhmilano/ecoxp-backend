import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { IAuthController } from './auth.controller.interface';

@Controller('auth')
export class AuthController implements IAuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		console.log('Registration attempt:', registerDto);
		return this.authService.register(registerDto);
	}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		console.log('Login attempt:', loginDto);
		return this.authService.login(loginDto);
	}

	@Post('reset')
	async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
		console.log('Password reset attempt:', resetPasswordDto.username);
		return this.authService.resetPassword(resetPasswordDto);
	}
}
