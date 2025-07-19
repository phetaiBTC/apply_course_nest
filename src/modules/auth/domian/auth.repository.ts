
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { LoginUserDto } from "../application/dto/login-user.dto";
import { User } from "src/modules/user/domain/user.entity";

export interface AuthRepository {
    // login(dto: LoginUserDto): Promise<{ token: string }>;
    verifyEmail(id: number): Promise<void>;
}
