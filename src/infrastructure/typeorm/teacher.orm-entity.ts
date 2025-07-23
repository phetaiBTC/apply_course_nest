import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { UserEntity } from "./user.orm-entity";
import { CoursesEntity } from "./courses.orm-entity";
export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}
@Entity('teacher')
export class TeacherEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    specialization: string; // e.g., "Mathematics", "Science"
    @Column()
    experience: number; // years of experience
    @Column()
    education: string; // e.g., "PhD in Mathematics"
    @OneToOne(() => UserEntity, { nullable: false })
    @JoinColumn()
    user: UserEntity;
    @OneToMany(()=>CoursesEntity, course => course.teacher)
    courses: CoursesEntity[];
}   