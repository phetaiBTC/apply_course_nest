import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherEntity } from "./teacher.orm-entity";
import { CourseCategoriesEntity } from "./course_categories.orm-entity";
import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { ApplyCoursesEntity } from "./apply_courses.orm-entity";
export enum CourseStatus {
    OPEN = 'open',
    CLOSED = 'closed',
    CANCELLED = 'cancelled',
}
@Entity('courses')
export class CoursesEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => TeacherEntity, teacher => teacher.courses)
    teacher: TeacherEntity;
    @ManyToOne(() => CourseCategoriesEntity, category => category.courses)
    category: CourseCategoriesEntity;
    @Column()
    title: string
    @Column()
    max_student: number;
    @Column()
    duration_hours: number; // e.g., 40 hours
    @Column()
    price: number; // e.g., 5000 THB
    @Column()
    registration_start_date: Date; // e.g., '2023-01-01'
    @Column()
    registration_end_date: Date; // e.g., '2023-01-31'
    @Column()
    start_date: Date; // e.g., '2023-02-01'
    @Column()
    end_date: Date; // e.g., '2023-03-01'
    @Column({ nullable: true })
    description: string; // e.g., "This course covers advanced topics in mathematics."
    @Column({ type: 'enum', enum: CourseStatus, default: CourseStatus.OPEN })
    status: CourseStatus
    @OneToMany(() => ApplyCoursesEntity, apply_course => apply_course.course)
    apply_courses: ApplyCoursesEntity[]
}