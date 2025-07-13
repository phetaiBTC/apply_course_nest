import { Inject } from "@nestjs/common";
import { User } from "src/modules/user/domain/user.entity";
import { UserRepository } from "src/modules/user/domain/user.repository";

export class GetUserByEmailUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) { }
    async execute(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
}