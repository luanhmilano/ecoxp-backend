import { 
  Injectable, 
  UnauthorizedException, 
  BadRequestException, 
  ConflictException, 
  NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}


  async register(registerDto: RegisterDto): Promise<User> {
    const { 
      fullName, 
      username, 
      email, 
      password, 
      confirmPassword, 
      isUnder12, 
      guardianEmail 
    } = registerDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas não coincidem.');
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { username },
        { email },
      ],
    });
    if (existingUser) {
      throw new ConflictException('Usuário ou e-mail já cadastrado.');
    }

    let guardianId: string = null;
    if (isUnder12) {
      if (!guardianEmail) {
        throw new BadRequestException('E-mail do responsável é obrigatório para menores de 12 anos.');
      }

      const guardian = await this.userRepository.findOne({ where: { email: guardianEmail } });
      if (!guardian) {
        throw new NotFoundException('Responsável não encontrado.');
      }
      guardianId = guardian.id;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      fullName,
      username,
      email,
      passwordHash,
      isUnder12,
      guardianId,
      role: 'user',
    });
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { usernameOrEmail, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
