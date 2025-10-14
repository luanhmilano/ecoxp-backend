import { IsString, IsEmail, IsNotEmpty, MinLength, ValidateIf, IsBoolean } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsBoolean()
  isUnder12: boolean;

  @ValidateIf(o => o.isUnder12)
  @IsEmail({}, { message: 'E-mail do responsável inválido' })
  guardianEmail?: string;
}
