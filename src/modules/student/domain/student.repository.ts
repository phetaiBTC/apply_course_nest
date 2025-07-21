

import { PaginationQueryDto } from "src/shared/dto/pagination-query.dto";
import { Student } from "./student.entity";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";
export interface StudentRepository {
    create(student: Student): Promise<Student>;
    findById(id: number): Promise<Student | null>;
    findAll(paginationQuery: PaginationQueryDto): Promise<IpaginationQuery<Student[]>>;
    delete(id: number): Promise<{message: string}>;
    update(id: number, student: Student): Promise<{message: string}>;
}