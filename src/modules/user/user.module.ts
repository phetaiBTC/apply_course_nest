import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { UserController } from './interfaces/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [
        CreateUserUseCase,
        {
            provide: 'UserRepository',
            useClass: UserRepositoryImpl,
        },
    ],
})
export class UserModule { }
