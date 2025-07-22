import { PaginationDto } from "src/shared/dto/paginationDto";
import { Student } from "./student";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { User } from "src/modules/user/domain/user";

export interface StudentRepository {
    save(student: Student, user: User): Promise<Student>;
    update(id: number, Student: Student): Promise<Student>;
    findOne(id: number): Promise<Student|null>;
    findAll(query: PaginationDto): Promise<PaginatedResponse<Student>>;
    hardDelete(id: number): Promise<{ message: string }>;
    softDelete(id: number): Promise<{ message: string }>;
    restore(id: number): Promise<{ message: string }>;
}