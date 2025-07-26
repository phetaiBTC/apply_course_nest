import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ApplyCourses } from "src/modules/apply_courses/domain/apply_courses";
import { ApplyCoursesRepository } from "src/modules/apply_courses/domain/apply_courses.repository";
import { CreateApplyCoursesDto } from "../../dto/create-apply_courses.dto";
// import { GetOneTeacherUseCase } from "src/modules/teacher/application/use-cases/query/get-one-teacher.use-case";
import { GetOneCourseUseCase } from "src/modules/course/application/use-cases/query/get-one-course.use-case";
import { GetOneStudentUseCase } from "src/modules/student/application/use-cases/query/get-one-student.use-case";
import { Course } from "src/modules/course/domain/course";

@Injectable()
export class CreateApplyCoursesUseCase {
    constructor(
        @Inject('ApplyCoursesRepository') private readonly applyCoursesRepository: ApplyCoursesRepository,
        private readonly getOneStudentUseCase: GetOneStudentUseCase,
        private readonly getOneCourseUseCase: GetOneCourseUseCase
    ) {}

    async execute(dto: CreateApplyCoursesDto): Promise<ApplyCourses> {
        const student = await this.getOneStudentUseCase.execute(dto.student)
        if(!student) throw new NotFoundException('Student not found')
        const course = await this.getOneCourseUseCase.execute(dto.course)
        if(!course) throw new NotFoundException('Course not found')
        const applyCourses = new ApplyCourses({
            student: student,
            course: course,
            price: course.price,
            status: dto.status,
            reason: dto.reason
        })
        return this.applyCoursesRepository.save(applyCourses)
    }
}