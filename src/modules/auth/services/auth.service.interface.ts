import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '../../entities/user.entity';

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<User>;
  login(loginDto: LoginDto): Promise<{ accessToken: string }>;
}
