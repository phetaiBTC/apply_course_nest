import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../../domain/user.repository";
import { User } from '../../../domain/user.entity';

@Injectable()
export class HardDeleteUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        await this.userRepository.hardDelete(id);
    }
}
