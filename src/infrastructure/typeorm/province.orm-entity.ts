import { DistrictEntity } from "./district.orm-entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('province')
export class ProvinceEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    name_en: string;
    @OneToMany(() => DistrictEntity, (district) => district.province)
    districts: DistrictEntity[]
}
