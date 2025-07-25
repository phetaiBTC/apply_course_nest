import { Module } from "@nestjs/common";
import { StudentModule } from "../student/student.module";
import { StudentEducationController } from "./controller/student_education.controller";
import { CreateEducationUseCase } from "./application/use-cases/command/create-student_education.use-case";
import { Student_educationRepositoryOrm } from "./infrastructure/student_education.repository.orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEducationsEntity } from "src/infrastructure/typeorm/student_educations.orm-entity";

@Module({
    imports: [StudentModule,TypeOrmModule.forFeature([
        StudentEducationsEntity
    ])],
    controllers: [StudentEducationController],
    providers: [
        {
            provide:'Student_educationRepository',
            useClass:Student_educationRepositoryOrm
        },
        CreateEducationUseCase
    ],
    exports: []
})
export class StudentEducationModule {}