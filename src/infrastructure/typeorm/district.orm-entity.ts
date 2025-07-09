import { ProvinceEntity } from "./province.orm-entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { StudentEntity } from "./student-entity";
@Entity('district')
export class DistrictEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    name_en: string;
    @ManyToOne(() => ProvinceEntity, (province) => province.districts)
    province: ProvinceEntity
    @OneToMany(() => StudentEntity, (student) => student.district)
    students: StudentEntity[]
}
