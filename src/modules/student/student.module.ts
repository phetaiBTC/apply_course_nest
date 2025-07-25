import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { StudentController } from "./controller/student.controller";
import { StudentRepositoryOrm } from "./infrastructure/student.repository.orm";
import { CreateStudentUseCase } from "./application/use-cases/command/create-student.use-case";
import { TRANSACTION_MANAGER_SERVICE } from "src/shared/constants/inject-key";
import { TransactionManagerService } from "src/infrastructure/transaction/transaction.service";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { TransactionModule } from "src/infrastructure/transaction/transaction.module";
import { UserModule } from "../user/user.module";
import { UserRepositoryOrm } from "../user/infrastructure/user.repository.orm";
import { GetOneStudentUseCase } from "./application/use-cases/query/get-one-student.use-case";
import { GetAllStudentUseCase } from "./application/use-cases/query/get-all-student.use-case";
import { UpdateStudentUseCase } from "./application/use-cases/command/update-student.use-case";
import { DistrictModule } from "../district/district.module";
import { DistrictEntity } from "src/infrastructure/typeorm/district.orm-entity";
import { HardDeleteStudentUseCase } from "./application/use-cases/command/hard-delete-student.use-case";
import { SoftDeleteStudentUseCase } from "./application/use-cases/command/soft-delete-student.use-case";
import { RestoreStudentUseCase } from "./application/use-cases/command/restore-student.use-case";
import { MailModule } from "../mail/mail.module";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([StudentEntity, UserEntity, DistrictEntity]),
        TransactionModule,
        DistrictModule,
        UserModule,
        MailModule
    ],
    controllers: [StudentController],
    providers: [
        {
            provide: 'StudentRepository',
            useClass: StudentRepositoryOrm
        },
        {
            provide: TRANSACTION_MANAGER_SERVICE,
            useClass: TransactionManagerService,
        },
        {
            provide: 'UserRepository',
            useClass: UserRepositoryOrm
        },
        CreateStudentUseCase,
        GetOneStudentUseCase,
        GetAllStudentUseCase,
        HardDeleteStudentUseCase,
        SoftDeleteStudentUseCase,
        RestoreStudentUseCase,
        UpdateStudentUseCase
    ],
    exports: [
        {
            provide: 'StudentRepository',
            useClass: StudentRepositoryOrm
        },
        GetOneStudentUseCase
    ]
})
export class StudentModule { }