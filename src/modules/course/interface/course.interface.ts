import { CourseStatus } from "src/infrastructure/typeorm/courses.orm-entity"
import { CourseCategory } from "src/modules/course_category/domain/course_category"
import { CourseCategoryResponse } from "src/modules/course_category/interface/course_category.interface"
import { Teacher } from "src/modules/teacher/domain/teacher"
import { teacherResponse } from "src/modules/teacher/interface/teacher.interface"

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
    description?: string
    status: CourseStatus
    teacher: Teacher
    category: CourseCategory
}

export interface CourseResponse {
    id?: number
    title: string
    max_student: number
    duration_hours: number
    price: number
    registration_start_date: string
    registration_end_date: string
    start_date: string
    end_date: string
    description?: string
    status: CourseStatus
    teacher: teacherResponse
    category: CourseCategoryResponse
    createdAt?: string
    updatedAt?: string
    deletedAt?: string | null
}