import { SharedBaseEntity } from 'src/shared/base/baseEntity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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

}
