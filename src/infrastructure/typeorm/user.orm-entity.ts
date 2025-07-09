import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// src/infrastructure/typeorm/user.orm-entity.ts
@Entity('users') // ชื่อตารางใน DB
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // เพิ่ม field อื่น ๆ ได้ เช่น timestamps
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
