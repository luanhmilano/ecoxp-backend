import { Controller, Post, Body, Headers, BadRequestException } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Registrar novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário criado com sucesso" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Fazer login" })
  @ApiResponse({ status: 200, description: "Login realizado com sucesso" })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("validate")
  @ApiOperation({ summary: "Validar token JWT" })
  @ApiResponse({ status: 200, description: "Token validado" })
  async validateToken(@Headers("authorization") authorization: string) {
    if (!authorization) {
      throw new BadRequestException("Token de autorização é obrigatório.");
    }

    const token = authorization.replace("Bearer ", "");
    if (!token) {
      throw new BadRequestException("Token inválido.");
    }

    return this.authService.validateToken(token);
  }
}
