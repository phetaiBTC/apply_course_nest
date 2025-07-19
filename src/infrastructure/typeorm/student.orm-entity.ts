import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { DistrictEntity } from "./district.orm-entity";
import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { UserEntity } from "./user.orm-entity";
import { StudentEducationsEntity } from "./student_educations.orm-entity";
import { ApplyCoursesEntity } from "./apply_courses.orm-entity";
export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}
@Entity('student')
export class StudentEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ nullable: true })
    birth_date: Date;

    @Column({ nullable: true })
    gender: Gender;

    @OneToOne(() => UserEntity, { nullable: false })
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => DistrictEntity, (district) => district.students, { nullable: true })
    district: DistrictEntity

    @OneToMany(() => StudentEducationsEntity, (education) => education.student_id)
    educations: StudentEducationsEntity[];

    @OneToMany(() => ApplyCoursesEntity, (apply_course) => apply_course.student)
    apply_courses: ApplyCoursesEntity[]
}   