import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/domain/user.repository";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "src/modules/user/domain/user";
import { hashPassword } from "src/shared/utils/bcrypt.util";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }

    async execute(dto: CreateUserDto): Promise<User> {
        const userExists = await this.userRepository.findByEmail(dto.email);
        if (userExists) throw new BadRequestException('User already exists');
        const user = new User({
            name: dto.name,
            surname: dto.surname,
            email: dto.email,
            password: await hashPassword(dto.password)
        });
        const createdUser = await this.userRepository.save(user);
        return createdUser;
    }
}