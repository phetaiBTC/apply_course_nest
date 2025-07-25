import { EducationStatus } from "src/infrastructure/typeorm/student_educations.orm-entity"
import { Student_educationProps } from "../interface/student_education.interface"
import { Student } from "src/modules/student/domain/student"

export class Student_education {
    public id?: number
    public level: string
    public field_of_study: string
    public current_occupation: string
    public work_experience: number
    public status: EducationStatus
    public createdAt?: Date
    public updatedAt?: Date
    public deletedAt?: Date | null
    public student_id: Student
    constructor(
        props: Student_educationProps
    ) {
        this.id = props.id;
        this.level = props.level
        this.status = props.status
        this.work_experience = props.work_experience
        this.current_occupation = props.current_occupation
        this.field_of_study = props.field_of_study
        this.student_id = props.student_id
    }
}