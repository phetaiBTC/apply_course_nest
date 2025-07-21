import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserRepositoryOrm } from "./infrastructure/user.repository.orm";
import { CreateUserUseCase } from "./application/use-cases/command/create-user.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { GetAllUserUseCase } from "./application/use-cases/query/get-all-user.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserRepositoryOrm
        },
        CreateUserUseCase,
        GetAllUserUseCase
    ],
    exports: []
})
export class UserModule { }