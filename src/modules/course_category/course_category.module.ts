import { Module } from "@nestjs/common";
import { CourseCategoryController } from "./controller/course_category.controller";
import { CourseCategoryRepositoryOrm } from "./infrastructure/course_category.repository.orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseCategoriesEntity } from "src/infrastructure/typeorm/course_categories.orm-entity";
import { CreateCourseCategoryUseCase } from "./application/use-cases/command/create-course_category.use-case";
import { GetOneCourseCategoryUseCase } from "./application/use-cases/query/get-one-course_category.use-case";
import { HardDeleteCourseCategoryUseCase } from "./application/use-cases/command/hard-delete-course_category.use-case";
import { SoftDeleteCourseCategoryUseCase } from "./application/use-cases/command/soft-delete-course_category.use-case";
import { RestoreCourseCategoryUseCase } from "./application/use-cases/command/restore-course_category.use-case";
import { UpdateCourseCategoryUseCase } from "./application/use-cases/command/update-course_category.use-case";
import { GetAllCourseCategoryUseCase } from "./application/use-cases/query/get-all-course_category.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([CourseCategoriesEntity])],
    controllers: [CourseCategoryController],
    providers: [
        {
            provide: 'CourseCategoryRepository',
            useClass: CourseCategoryRepositoryOrm
        },
        CreateCourseCategoryUseCase,
        UpdateCourseCategoryUseCase,
        RestoreCourseCategoryUseCase,
        HardDeleteCourseCategoryUseCase,
        SoftDeleteCourseCategoryUseCase,
        GetOneCourseCategoryUseCase,
        GetAllCourseCategoryUseCase
    ],
    exports: []
})
export class CourseCategoryModule { }