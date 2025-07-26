import { ApplyCourseStatus } from "src/infrastructure/typeorm/apply_courses.orm-entity"
import { CourseResponse } from "src/modules/course/interface/course.interface"
import { StudentResponse } from "src/modules/student/interface/student.interface"

export interface ApplyCoursesResponse {
    id?: number
    student: StudentResponse,
    course: CourseResponse,
    price: number,
    reason?: string,
    status: ApplyCourseStatus,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string | null
}