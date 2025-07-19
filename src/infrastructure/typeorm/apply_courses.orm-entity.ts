import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.orm-entity";
import { CoursesEntity } from "./courses.orm-entity";
import { CourseCompletionRecordsEntity } from "./course_completion_records.orm-entity";
import { SharedBaseEntity } from "src/shared/base/baseEntity";
export enum ApplyCourseStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}
@Entity('apply_courses')
export class ApplyCoursesEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => StudentEntity, (student) => student.apply_courses)
    student: StudentEntity;
    @ManyToOne(() => CoursesEntity, (course) => course.apply_courses)
    course: CoursesEntity;
    @Column()
    price: number; // Price of the course
    @Column()
    reason: string; // Reason for applying to the course
    @Column({ type: 'enum', enum: ApplyCourseStatus, default: ApplyCourseStatus.PENDING })
    status:ApplyCourseStatus
    @OneToMany(()=>CourseCompletionRecordsEntity, (course_completion) => course_completion.apply_course)
    course_completion: CourseCompletionRecordsEntity[];
}