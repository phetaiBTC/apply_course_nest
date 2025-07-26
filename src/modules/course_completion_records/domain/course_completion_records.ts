import { CourseCompletionStatus } from "src/infrastructure/typeorm/course_completion_records.orm-entity";
import { ApplyCourses } from "src/modules/apply_courses/domain/apply_courses";
import { User } from "src/modules/user/domain/user";
import { CourseCompletionRecordsProps } from "../interface/course_completion_records.interface";

export class CourseCompletionRecords {
    id?: number;
    apply_course?: ApplyCourses
    total_score: number;
    is_certified: boolean;
    status: CourseCompletionStatus;
    completion_date: Date;
    certificate_issued_date: Date;
    total_study_hours: number
    created_by?: User
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    constructor(props: CourseCompletionRecordsProps) {
        this.id = props.id;
        this.apply_course = props.apply_course;
        this.total_score = props.total_score;
        this.is_certified = props.is_certified;
        this.status = props.status;
        this.completion_date = props.completion_date;
        this.certificate_issued_date = props.certificate_issued_date;
        this.total_study_hours = props.total_study_hours
        this.created_by = props.created_by
    }
}