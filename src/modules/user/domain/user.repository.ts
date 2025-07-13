
import { PaginationQueryDto } from "src/shared/dto/pagination-query.dto";
import { User } from "./user.entity";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";

export interface UserRepository {
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  hardDelete(id: number): Promise<void>;
  softDelete(id: number): Promise<void>;
  findAll(paginationQuery: PaginationQueryDto): Promise<IpaginationQuery<User[]>>;
}
