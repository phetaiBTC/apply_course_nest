import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from 'src/modules/user/domain/user.entity';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: number, dto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const updatedUser = new User(
            existingUser.id,
            dto.name || existingUser.name,
            dto.email || existingUser.email,
            dto.surname || existingUser.surname,
            dto.password ? await bcrypt.hash(dto.password, 10) : existingUser.password,
        );
        return this.userRepository.update(id, updatedUser);
    }
}
