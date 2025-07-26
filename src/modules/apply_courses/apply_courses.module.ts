import { Module } from "@nestjs/common";
import { ApplyCoursesController } from "./controller/apply_courses.controller";
import { ApplyCoursesRepositoryOrm } from "./infrastructure/apply_courses.repository.orm";
import { CourseModule } from "../course/course.module";
import { StudentModule } from "../student/student.module";
import { CreateApplyCoursesUseCase } from "./application/use-cases/command/create-apply_courses.use-case";
import { GetOneApplyCoursesUseCase } from "./application/use-cases/query/get-one-apply_courses.use-case";
import { GetAllApplyCoursesUseCase } from "./application/use-cases/query/get-all-apply_courses.use-case";
import { UpdateApplyCoursesUseCase } from "./application/use-cases/command/update-apply_courses.use-case";
import { SoftDeleteApplyCoursesUseCase } from "./application/use-cases/command/soft-delete-apply_courses.use-case";
import { HardDeleteApplyCoursesUseCase } from "./application/use-cases/command/hard-delete-apply_courses.use-case";
import { RestoreApplyCoursesUseCase } from "./application/use-cases/command/restore-apply_courses.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplyCoursesEntity } from "src/infrastructure/typeorm/apply_courses.orm-entity";

@Module({
    imports: [StudentModule, CourseModule,TypeOrmModule.forFeature([ApplyCoursesEntity])],
    controllers: [ApplyCoursesController],
    providers: [
        {
            provide: 'ApplyCoursesRepository',
            useClass: ApplyCoursesRepositoryOrm
        },
        CreateApplyCoursesUseCase,
        GetOneApplyCoursesUseCase,
        GetAllApplyCoursesUseCase,
        UpdateApplyCoursesUseCase,
        SoftDeleteApplyCoursesUseCase,
        HardDeleteApplyCoursesUseCase,
        RestoreApplyCoursesUseCase

    ],
    exports: [
        GetOneApplyCoursesUseCase
    ]
})
export class ApplyCoursesModule { }