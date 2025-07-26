import { Module, Res } from "@nestjs/common";
import { CourseCompletionRecordsRepositoryOrm } from "./infrastructure/course_completion_records.repository.orm";
import { CourseCompletionRecordsController } from "./controller/course_completion_records.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseCompletionRecordsEntity } from "src/infrastructure/typeorm/course_completion_records.orm-entity";
import { ApplyCoursesModule } from "../apply_courses/apply_courses.module";
import { UserModule } from "../user/user.module";
import { GetOneCourseCompletionRecordsUseCase } from "./application/use-cases/query/get-one-course_completion_records.use-case";
import { CreateCourseCompletionRecordsUseCase } from "./application/use-cases/command/create-course_completion_records.use-case";
import { GetAllCourseCompletionRecordsUseCase } from "./application/use-cases/query/get-all-course_completion_records.use-case";
import { UpdateCourseCompletionRecordsUseCase } from "./application/use-cases/command/update-course_completion_records.use-case";
import { SoftDeleteCourseCompletionRecordsUseCase } from "./application/use-cases/command/soft-delete-course_completion_records.use-case";
import { HardDeleteCourseCompletionRecordsUseCase } from "./application/use-cases/command/hard-delete-course_completion_records.use-case";
import { RestoreCourseCompletionRecordsUseCase } from "./application/use-cases/command/restore-course_completion_records.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([CourseCompletionRecordsEntity]), ApplyCoursesModule, UserModule],
    controllers: [CourseCompletionRecordsController],
    providers: [
        {
            provide: 'CourseCompletionRecordsRepository',
            useClass: CourseCompletionRecordsRepositoryOrm
        },
        GetOneCourseCompletionRecordsUseCase,
        CreateCourseCompletionRecordsUseCase,
        GetAllCourseCompletionRecordsUseCase,
        UpdateCourseCompletionRecordsUseCase,
        SoftDeleteCourseCompletionRecordsUseCase,
        HardDeleteCourseCompletionRecordsUseCase,
        RestoreCourseCompletionRecordsUseCase
    ],
    exports: []
})
export class CourseCompletionRecordsModule { }