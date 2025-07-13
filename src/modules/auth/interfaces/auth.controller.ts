import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "../application/dto/login-user.dto";
import { LoginUseCase } from "../application/use-cases/query/login.use-case";
import { Public } from "src/shared/decorators/auth.decorator";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
    ) { }
    @Public()
    @Post('login')
    login(@Body() dto: LoginUserDto) { 
        return this.loginUseCase.execute(dto);
    }
}