import { Injectable } from "@nestjs/common";
import { AuthRepository } from "../domian/auth.repository";
import { LoginUserDto } from "../application/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly jwtService: JwtService) { }
    login(dto: LoginUserDto): Promise<{ token: string; }> {
        const payload = { email: dto.email };
        const token = this.jwtService.sign(payload);
        return Promise.resolve({ token });
    }
}