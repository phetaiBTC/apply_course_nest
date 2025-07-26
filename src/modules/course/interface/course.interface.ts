import { CourseStatus } from "src/infrastructure/typeorm/courses.orm-entity"
import { CourseCategory } from "src/modules/course_category/domain/course_category"
import { Teacher } from "src/modules/teacher/domain/teacher"

export interface CoursePrpos {
    id?: number
    title: string
    max_student: number
    duration_hours: number
    price: number
    registration_start_date: Date
    registration_end_date: Date
    start_date: Date
    end_date: Date
    description: string
    status: CourseStatus
    teacher: Teacher
    category: CourseCategory
}