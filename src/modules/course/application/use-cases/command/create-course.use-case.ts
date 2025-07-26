import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateCourseDto } from "../../dto/create-course.dto";
import { CourseRepository } from "src/modules/course/domain/course.repository";
import { Course } from "src/modules/course/domain/course";
import { GetOneTeacherUseCase } from "src/modules/teacher/application/use-cases/query/get-one-teacher.use-case";
import { GetOneCourseCategoryUseCase } from "src/modules/course_category/application/use-cases/query/get-one-course_category.use-case";
import { format } from "path";
import { formatTimeUtil } from "src/shared/utils/formatTime.util";
@Injectable()
export class CreateCourseUseCase {
    constructor(
        @Inject('CourseRepository')
        private readonly courseRepository: CourseRepository,
        private readonly getOneTeacherUseCase: GetOneTeacherUseCase,
        private readonly getOneCategoryUseCase: GetOneCourseCategoryUseCase
    ) {
    }
    async execute(dto: CreateCourseDto) {
        const teacher = await this.getOneTeacherUseCase.execute(dto.teacher);
        const category = await this.getOneCategoryUseCase.execute(dto.category);
        const course = new Course({
            teacher: teacher,
            category: category,
            title: dto.title,
            max_student: dto.max_student,
            duration_hours: dto.duration_hours,
            price: dto.price,
            registration_start_date: dto.registration_start_date,
            registration_end_date: dto.registration_end_date,
            start_date: dto.start_date,
            end_date: dto.end_date,
            description: dto.description,
            status: dto.status
        });
        const courseExist = await this.courseRepository.findCourseExist(course);
        // console.log(courseExist)
        if (courseExist.length > 0) {
            throw new BadRequestException(`Course already exist between dates ${formatTimeUtil(courseExist[0].start_date)} and ${formatTimeUtil(courseExist[0].end_date)}`);
        }
        return this.courseRepository.save(course);
    }

}