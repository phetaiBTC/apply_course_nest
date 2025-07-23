import { User } from "src/modules/user/domain/user";
import { Teacher } from "./teacher";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

export interface TeacherRepository {
    save(teacher: Teacher, user: User): Promise<Teacher>;
    update(id: number, teacher: Teacher, user: User): Promise<Teacher>;
    findOne(id: number): Promise<Teacher | null>;
    findAll(query: PaginationDto): Promise<PaginatedResponse<Teacher>>;
    hardDelete(id: number): Promise<{ message: string }>;
    softDelete(id: number): Promise<{ message: string }>;
    restore(id: number): Promise<{ message: string }>;
}