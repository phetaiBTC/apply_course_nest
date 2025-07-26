import { ApplyCourseStatus } from "src/infrastructure/typeorm/apply_courses.orm-entity"
import { Course } from "src/modules/course/domain/course"
import { Student } from "src/modules/student/domain/student"

export interface ApplyCoursesProps {
    id?: number
    student: Student
    course: Course
    price: number
    reason?: string
    status: ApplyCourseStatus
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date | null
}

export class ApplyCourses {
    public id?: number
    public student: Student
    public course: Course
    public price: number
    public reason?: string
    public status: ApplyCourseStatus
    public createdAt?: Date
    public updatedAt?: Date
    public deletedAt?: Date | null
    constructor(props: ApplyCoursesProps) {
        this.id = props.id
        this.student = props.student
        this.course = props.course
        this.price = props.price
        this.reason = props.reason
        this.status = props.status
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
        this.deletedAt = props.deletedAt ?? null
    }
}