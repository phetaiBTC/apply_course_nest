import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from 'src/modules/auth/domian/auth.repository';
import { LoginUserDto } from '../../dto/login-user.dto';
import { GetUserByEmailUseCase } from 'src/modules/user/application/use-cases/query/get-user-by-email.use-case';
import { comparePassword } from 'src/shared/utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService,

    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) { }
  async execute(dto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.getUserByEmailUseCase.execute(dto.email);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if(!user.is_verified){
      throw new UnauthorizedException('User is not verified');
    }
    const isPasswordValid = await comparePassword(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { email: dto.email };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
