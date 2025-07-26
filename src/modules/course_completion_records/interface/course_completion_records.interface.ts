import { CourseCompletionStatus } from "src/infrastructure/typeorm/course_completion_records.orm-entity";
import { ApplyCourses } from "src/modules/apply_courses/domain/apply_courses";
import { ApplyCoursesResponse } from "src/modules/apply_courses/interface/apply_courses.interface";
import { User } from "src/modules/user/domain/user";
import { UserResponse } from "src/modules/user/interface/user.interface";

export interface CourseCompletionRecordsProps {
    id?: number;
    apply_course?: ApplyCourses
    total_score: number;
    is_certified: boolean;
    status: CourseCompletionStatus;
    completion_date: Date;
    certificate_issued_date: Date;
    total_study_hours: number
    created_by?: User
}

export interface CourseCompletionRecordsResponse {
    id?: number;
    apply_course: ApplyCoursesResponse
    total_score: number;
    is_certified: boolean;
    status: CourseCompletionStatus;
    completion_date: string;
    certificate_issued_date: string;
    total_study_hours: number
    created_by?: UserResponse
    createdAt?: string
    updatedAt?: string
    deletedAt?: string | null
}