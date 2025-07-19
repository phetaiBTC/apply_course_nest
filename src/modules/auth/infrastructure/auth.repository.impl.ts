import { Injectable, NotFoundException } from "@nestjs/common";
import { AuthRepository } from "../domian/auth.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { Repository } from "typeorm";
@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) { }
    async verifyEmail(id: number): Promise<void> {
        await this.userRepo.update(id, { is_verified: true });
    }
}