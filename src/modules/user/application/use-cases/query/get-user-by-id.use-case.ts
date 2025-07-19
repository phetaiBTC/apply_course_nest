import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/modules/user/domain/user.entity";
import { UserRepository } from "src/modules/user/domain/user.repository";
@Injectable()
export class GetUserByIdUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) { }
    async execute(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}