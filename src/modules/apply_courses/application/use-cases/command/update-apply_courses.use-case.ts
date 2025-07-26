import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ApplyCourses } from "src/modules/apply_courses/domain/apply_courses";
import { ApplyCoursesRepository } from "src/modules/apply_courses/domain/apply_courses.repository";
import { CreateApplyCoursesDto } from "../../dto/create-apply_courses.dto";
import { GetOneCourseUseCase } from "src/modules/course/application/use-cases/query/get-one-course.use-case";
import { GetOneStudentUseCase } from "src/modules/student/application/use-cases/query/get-one-student.use-case";

@Injectable()
export class UpdateApplyCoursesUseCase {
    constructor(
        @Inject('ApplyCoursesRepository') private readonly applyCoursesRepository: ApplyCoursesRepository,
        private readonly getOneStudentUseCase: GetOneStudentUseCase,
        private readonly getOneCourseUseCase: GetOneCourseUseCase
    ) { }

    async execute(id: number, dto: CreateApplyCoursesDto): Promise<ApplyCourses> {
        const applyCoursesExist = await this.applyCoursesRepository.findOne(id)
        if (!applyCoursesExist) throw new NotFoundException('ApplyCourses not found')
        const student = await this.getOneStudentUseCase.execute(dto.student)
        if (!student) throw new NotFoundException('Student not found')
        const course = await this.getOneCourseUseCase.execute(dto.course)
        if (!course) throw new NotFoundException('Course not found')
        const applyCourses = new ApplyCourses({
            student: student,
            course: course,
            price: dto.price ? dto.price : applyCoursesExist.price,
            status: dto.status,
            reason: dto.reason
        })
        return this.applyCoursesRepository.update(id, applyCourses)
    }
}