import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user.repository';
import { User } from '../../../domain/user.entity';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { IpaginationQuery } from 'src/shared/interface/pagination-interface';

@Injectable()
export class ListUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
    ) { }
    async execute(paginationQuery: PaginationQueryDto): Promise<IpaginationQuery<User[]>> {
        const users = await this.userRepository.findAll(paginationQuery);
        return users
    }
}
