import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { StudentRepositoryImpl } from "./infrastructure/student.repository.impl";
import { StudentController } from "./interfaces/student.controller";
import { CreateStudentUseCase } from "./application/use-cases/command/create-student.use-case";
import { UserModule } from "../user/user.module";
import { MailModule } from "../mail/mail.module";
import { AuthModule } from "../auth/auth.module";
import { GetStudentByIdUseCase } from "./application/use-cases/query/get-student-by-id.use-case";
import { GetStudentAllUseCase } from "./application/use-cases/query/get-student-all.user-case";
import { DeleteStudentUseCase } from "./application/use-cases/command/delete-student.use-case";
import { UpdateStudentUseCase } from "./application/use-cases/command/update-student.use-case";
@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([StudentEntity]),
        MailModule,
        AuthModule
    ],
    controllers: [StudentController],
    providers: [
        CreateStudentUseCase,
        GetStudentByIdUseCase,
        GetStudentAllUseCase,
        UpdateStudentUseCase,
        DeleteStudentUseCase,
        {
            provide: 'StudentRepository',
            useClass: StudentRepositoryImpl,
        }
    ],
    exports: []
})
export class StudentModule { }