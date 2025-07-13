import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from 'src/modules/auth/domian/auth.repository';
import { LoginUserDto } from '../../dto/login-user.dto';
import { GetUserByEmailUseCase } from 'src/modules/user/application/use-cases/query/get-user-by-email.use-case';
import { comparePassword } from 'src/shared/utils/bcrypt.util';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) { }
  async execute(dto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.getUserByEmailUseCase.execute(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await comparePassword(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = await this.authRepository.login(dto);
    return token;
  }
}
