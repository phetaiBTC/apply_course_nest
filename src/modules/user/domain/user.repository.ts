import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";

export interface UserRepository {
  create(user: Partial<UserEntity>): Promise<UserEntity>;
  update(id: number, user: Partial<UserEntity>): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  // เพิ่มตามต้องการ เช่น delete, findAll
}
