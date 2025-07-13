import { SharedBaseEntity } from 'src/shared/base/baseEntity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { StudentEntity } from './student.orm-entity';

@Entity('users') // ชื่อตารางใน DB
export class UserEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => StudentEntity, (student) => student.user)
  student: StudentEntity;
}
