import { ProvinceEntity } from "./province.orm-entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
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
}
