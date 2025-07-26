import { CourseStatus } from "src/infrastructure/typeorm/courses.orm-entity"
import { CourseCategory } from "src/modules/course_category/domain/course_category"
import { Teacher } from "src/modules/teacher/domain/teacher"
import { CoursePrpos } from "../interface/course.interface"

export class Course {
    public id?: number
    public title: string
    public max_student: number
    public duration_hours: number
    public price: number
    public registration_start_date: Date
    public registration_end_date: Date
    public start_date: Date
    public end_date: Date
    public description?: string
    public status: CourseStatus
    public teacher: Teacher
    public category: CourseCategory
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date | null;
    constructor(props: CoursePrpos) {
        this.id = props.id
        this.title = props.title
        this.max_student = props.max_student
        this.duration_hours = props.duration_hours
        this.price = props.price
        this.registration_start_date = props.registration_start_date
        this.registration_end_date = props.registration_end_date
        this.start_date = props.start_date
        this.end_date = props.end_date
        this.description = props.description
        this.status = props.status
        this.teacher = props.teacher
        this.category = props.category
    }
}