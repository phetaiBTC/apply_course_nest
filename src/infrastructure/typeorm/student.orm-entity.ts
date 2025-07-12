import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { DistrictEntity } from "./district.orm-entity";

@Entity()
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    birth_date: Date;

    @Column()
    gender: 'male' | 'female';
    
    @ManyToOne(() => DistrictEntity, (district) => district.students)
    district: DistrictEntity
}   