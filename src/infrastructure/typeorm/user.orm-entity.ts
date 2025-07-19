import { SharedBaseEntity } from 'src/shared/base/baseEntity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { StudentEntity } from './student.orm-entity';
import { RoleEntity } from './role.orm-entity';
import { PermissionsEntity } from './permissions.orm-entity';
import { TeacherEntity } from './teacher.orm-entity';
import { CourseCompletionRecordsEntity } from './course_completion_records.orm-entity';

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

  @Column({ nullable: true ,default: false})
  is_verified: boolean;

  @OneToOne(() => StudentEntity, (student) => student.user)
  student: StudentEntity;

  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  teacher: TeacherEntity;

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];

  @ManyToMany(() => PermissionsEntity, permission => permission.users)
  @JoinTable({ name: 'user_permissions' })
  permissions: PermissionsEntity[];

  @OneToMany(() => CourseCompletionRecordsEntity, (courseCompletion) => courseCompletion.created_by)
  course_completion_records: CourseCompletionRecordsEntity[]
}
