import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { StudentRepositoryImpl } from "./infrastructure/student.repository.impl";
import { StudentController } from "./interfaces/student.controller";
import { CreateStudentUseCase } from "./application/use-cases/command/create-student.use-case";
import { UserModule } from "../user/user.module";
@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([StudentEntity])
    ],
    controllers: [StudentController],
    providers: [
        CreateStudentUseCase,
        {
            provide: 'StudentRepository',
            useClass: StudentRepositoryImpl,
        }
    ],
    exports: []
})
export class StudentModule { }