import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/modules/user/domain/user.entity";
import { UserRepository } from "src/modules/user/domain/user.repository";
@Injectable()
export class GetUserByEmailUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) { }
    async execute(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
}