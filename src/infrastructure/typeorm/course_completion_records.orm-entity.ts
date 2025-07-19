import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplyCoursesEntity } from "./apply_courses.orm-entity";
import { UserEntity } from "./user.orm-entity";
import { SharedBaseEntity } from "src/shared/base/baseEntity";
export enum CourseCompletionStatus {
    PASSED = 'passed',
    FAILED = 'failed',
    INCOMPLETED = 'incompleted',
    WITHDRAWN = 'withdrawn',
}
@Entity('course_completion_records')
export class CourseCompletionRecordsEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>ApplyCoursesEntity, (apply_course) => apply_course.course_completion)
    apply_course: ApplyCoursesEntity;
    @ManyToOne(()=> UserEntity, (user) => user.course_completion_records)
    created_by: UserEntity;
    @Column()
    total_score: number; // Total score achieved in the course
    @Column()
    is_certified: boolean; // Whether the student has completed the course and received a certificate
    @Column({ type: 'enum', enum: CourseCompletionStatus, default: CourseCompletionStatus.PASSED })
    status: CourseCompletionStatus
    @Column()
    completion_date: Date
    @Column()
    certificate_issued_date: Date
    @Column()
    total_study_hours: number
}