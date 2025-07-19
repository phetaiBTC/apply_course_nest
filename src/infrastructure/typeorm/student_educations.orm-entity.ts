import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { StudentEntity } from "./student.orm-entity";
export enum EducationStatus {
    STUDING = 'studying',
    GRADUATED = 'graduated',
}
@Entity('student_educations')
export class StudentEducationsEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => StudentEntity, (student) => student.educations)
    student_id: StudentEntity;
    @Column()
    level: string; // e.g., "Bachelor's", "Master's"
    @Column()
    field_of_study: string; // e.g., "Computer Science", "Business Administration"
    @Column()
    current_occupation: string; // e.g., "Software Engineer", "Data Analyst"
    @Column({ nullable: true })
    work_experience: number;
    @Column({ type: 'enum', enum: EducationStatus, default: EducationStatus.GRADUATED })
    status: EducationStatus;
}
