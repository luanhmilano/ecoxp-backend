import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      throw new ConflictException("Usuário ou e-mail já cadastrado.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      passwordHash,
      role: "user",
    });
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{
    accessToken: string;
    user: { id: string; username: string; email: string; createdAt: Date };
  }> {
    const { usernameOrEmail, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas.");
    }
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException("Credenciais inválidas.");
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  async validateToken(token: string): Promise<{
    valid: boolean;
    user?: { id: string; username: string; email: string; role: string };
  }> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        return { valid: false };
      }

      return {
        valid: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      return { valid: false };
    }
  }
}
