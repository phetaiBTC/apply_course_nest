
import { LoginUserDto } from "../application/dto/login-user.dto";

export interface AuthRepository {
    login(dto: LoginUserDto): Promise<{ token: string }>;
}
