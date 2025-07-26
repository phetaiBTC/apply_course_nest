import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CourseCompletionRecords } from "src/modules/course_completion_records/domain/course_completion_records";
import { CourseCompletionRecordsRepository } from "src/modules/course_completion_records/domain/course_completion_records.repository";
import { CourseCompletionRecordsDto } from "../../dto/create-course_completion_records.dto";
import { GetOneApplyCoursesUseCase } from "src/modules/apply_courses/application/use-cases/query/get-one-apply_courses.use-case";
import { GetOneUserUseCase } from "src/modules/user/application/use-cases/query/get-one-user.use-case";

@Injectable()
export class CreateCourseCompletionRecordsUseCase {
    constructor(
        @Inject('CourseCompletionRecordsRepository')
        private readonly courseCompletionRecordsRepository: CourseCompletionRecordsRepository,
        private readonly getOneApplyCoursesUseCase: GetOneApplyCoursesUseCase,
        private readonly getOneUserUseCase: GetOneUserUseCase
    ) { }

    async execute(dto: CourseCompletionRecordsDto,createdBy: number): Promise<CourseCompletionRecords> {
        const applyCoursesExist = await this.getOneApplyCoursesUseCase.execute(dto.apply_courses)
        if (!applyCoursesExist) throw new NotFoundException('ApplyCourses not found')
        const user = await this.getOneUserUseCase.execute(createdBy)
        if (!user) throw new NotFoundException('User not found')
        const course_completion_records = new CourseCompletionRecords({
            apply_course: applyCoursesExist,
            created_by: user,
            total_score: dto.total_score,
            is_certified: dto.is_certified,
            status: dto.status,
            completion_date: dto.completion_date,
            certificate_issued_date: dto.certificate_issued_date,
            total_study_hours: dto.total_study_hours
        })
        return this.courseCompletionRecordsRepository.save(course_completion_records)
    }
}