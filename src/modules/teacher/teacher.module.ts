import { Module } from "@nestjs/common";
import { TeacherRepositoryOrm } from "./infrastructure/teacher.repository.orm";
import { TeacherController } from "./controller/teacher.controller";
import { CreateTeacherUseCase } from "./application/use-cases/command/create-teacher.use-case";
import { UserRepositoryOrm } from "../user/infrastructure/user.repository.orm";
import { TRANSACTION_MANAGER_SERVICE } from "src/shared/constants/inject-key";
import { TransactionManagerService } from "src/infrastructure/transaction/transaction.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherEntity } from "src/infrastructure/typeorm/teacher.orm-entity";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { AuthModule } from "../auth/auth.module";
import { MailModule } from "../mail/mail.module";
import { GetAllTeacherUseCase } from "./application/use-cases/query/get-all-teacher.use-case";
import { GetOneTeacherUseCase } from "./application/use-cases/query/get-one-teacher.use-case";
import { HardDeleteTeacherUseCase } from "./application/use-cases/command/hard-delete-teacher.use-case";
import { SoftDeleteTeacherUseCase } from "./application/use-cases/command/soft-delete-teacher.use-case";
import { UpdateTeacherUseCase } from "./application/use-cases/command/update-teacher.use-case";
import { RestoreTeacherUseCase } from "./application/use-cases/command/restore-teacher.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([TeacherEntity, UserEntity]), AuthModule, MailModule],
    controllers: [TeacherController],
    providers: [
        {
            provide: 'TeacherRepository',
            useClass: TeacherRepositoryOrm
        },
        {
            provide: TRANSACTION_MANAGER_SERVICE,
            useClass: TransactionManagerService,
        },
        {
            provide: 'UserRepository',
            useClass: UserRepositoryOrm
        },
        CreateTeacherUseCase,
        GetAllTeacherUseCase,
        GetOneTeacherUseCase,
        HardDeleteTeacherUseCase,
        SoftDeleteTeacherUseCase,
        UpdateTeacherUseCase,
        RestoreTeacherUseCase
    ],
    exports: [
        {
            provide: 'TeacherRepository',
            useClass: TeacherRepositoryOrm
        },
        GetOneTeacherUseCase
    ]
})
export class TeacherModule { }
