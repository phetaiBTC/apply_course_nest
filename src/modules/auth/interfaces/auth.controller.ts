import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LoginUserDto } from "../application/dto/login-user.dto";
import { LoginUseCase } from "../application/use-cases/query/login.use-case";
import { Public } from "src/shared/decorators/auth.decorator";
import { VerifyEmailUseCase } from "../application/use-cases/command/verify-email.use-case";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly verifyEmailUseCase: VerifyEmailUseCase
    ) { }
    @Public()
    @Post('login')
    login(@Body() dto: LoginUserDto): Promise<{ token: string }>{
        return this.loginUseCase.execute(dto);
    }
    @Public()
    @Get('verify-email/:token')
    verifyEmail(@Param('token') token: string) {
        return this.verifyEmailUseCase.execute(token);
    }
}