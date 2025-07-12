import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { ProvinceEntity } from "./province.orm-entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity('student_educations')
export class StudentEducationsEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    name_en: string;
    @ManyToOne(() => ProvinceEntity, (province) => province.districts)
    province: ProvinceEntity
}
