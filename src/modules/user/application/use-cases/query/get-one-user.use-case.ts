import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/domain/user.repository";
import { CreateUserDto } from "../../dto/create-user.dto";

@Injectable()
export class GetOneUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }

    async execute(dto: CreateUserDto) {
        
    }
}