import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { DistrictEntity } from "./district.orm-entity";
import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { UserEntity } from "./user.orm-entity";
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
}   