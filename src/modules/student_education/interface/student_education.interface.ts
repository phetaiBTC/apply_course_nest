import { EducationStatus } from "src/infrastructure/typeorm/student_educations.orm-entity"
import { Student } from "src/modules/student/domain/student"

export interface Student_educationProps {
    id?: number
    level: string
    field_of_study: string
    current_occupation: string
    work_experience: number
    status: EducationStatus
    student_id : Student
}