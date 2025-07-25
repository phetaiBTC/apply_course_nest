import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { Student_education } from "./student_education";
import { PaginationDto } from "src/shared/dto/paginationDto";

export interface Student_educationRepository {
    // getAll():Promise<PaginatedResponse<Student_education>>
    save(educatoin: Student_education): Promise<Student_education>
    // update(id: number, Student: Student_education): Promise<Student_education>;
    // findOne(id: number): Promise<Student_education | null>;
    // findAll(query: PaginationDto): Promise<PaginatedResponse<Student_education>>;
    // hardDelete(id: number): Promise<{ message: string }>;
    // softDelete(id: number): Promise<{ message: string }>;
    // restore(id: number): Promise<{ message: string }>;
}