import { Module } from "@nestjs/common";
import { CourseController } from "./controller/course.controller";
import { CourseRepositoryOrm } from "./infrastructure/course.repository.orm";
import { TeacherModule } from "../teacher/teacher.module";
import { CoursesEntity } from "src/infrastructure/typeorm/courses.orm-entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseCategoryModule } from "../course_category/course_category.module";
import { CreateCourseUseCase } from "./application/use-cases/command/create-course.use-case";
import { GetAllCourseUseCase } from "./application/use-cases/query/get-all-course.use-case";
import { HardDeleteCourseUseCase } from "./application/use-cases/command/hard-delete-course.use-case";
import { SoftDeleteCourseUseCase } from "./application/use-cases/command/soft-delete-course.use-case";
import { RestoreCourseUseCase } from "./application/use-cases/command/restore-course.use-case";
import { UpdateCourseUseCase } from "./application/use-cases/command/update-course.use-case";
import { GetOneCourseUseCase } from "./application/use-cases/query/get-one-course.use-case";

@Module({
    imports: [
        TeacherModule,
        CourseCategoryModule,
        TypeOrmModule.forFeature([CoursesEntity])
    ],
    controllers: [CourseController],
    providers: [
        {
            provide: 'CourseRepository',
            useClass: CourseRepositoryOrm
        },
        CreateCourseUseCase,
        GetAllCourseUseCase,
        HardDeleteCourseUseCase,
        SoftDeleteCourseUseCase,
        RestoreCourseUseCase,
        UpdateCourseUseCase,
        GetOneCourseUseCase
    ],
    exports: [
        GetOneCourseUseCase
    ]
})
export class CourseModule { }