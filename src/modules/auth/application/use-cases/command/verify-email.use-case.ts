import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "src/modules/auth/domian/auth.repository";
import { GetUserByEmailUseCase } from "src/modules/user/application/use-cases/query/get-user-by-email.use-case";

@Injectable()
export class VerifyEmailUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepository,
    ) { }
    async execute(token: string) {
        const payload = await this.jwtService.decode(token);
        const isUser = await this.getUserByEmailUseCase.execute(payload.email);
        if (isUser?.id == null) {
            throw new NotFoundException('User not found');
        }
        if (isUser.is_verified) {
            throw new NotFoundException('User is already verified');
        }
        return this.authRepository.verifyEmail(isUser.id);
    }
}