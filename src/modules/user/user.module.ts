import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { UserController } from './interfaces/user.controller';
import { CreateUserUseCase } from './application/use-cases/command/create-user.use-case';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import { ListUserUseCase } from './application/use-cases/query/list-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/command/update-user.use-case';
import { GetUserByEmailUseCase } from './application/use-cases/query/get-user-by-email.use-case';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),

    ],
    controllers: [UserController],
    providers: [
        CreateUserUseCase,
        ListUserUseCase,
        UpdateUserUseCase,
        GetUserByEmailUseCase,
        {
            provide: 'UserRepository',
            useClass: UserRepositoryImpl,
        },
    ],
    exports: [
        GetUserByEmailUseCase
    ]
})
export class UserModule { }
