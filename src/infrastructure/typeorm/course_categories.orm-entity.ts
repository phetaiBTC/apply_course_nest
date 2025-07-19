import e from "express";
import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoursesEntity } from "./courses.orm-entity";

@Entity('course_categories')
export class CourseCategoriesEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => CoursesEntity, course => course.teacher)
    courses: CoursesEntity[];
}