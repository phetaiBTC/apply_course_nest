import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { ApplyCourses } from "./apply_courses";
import { PaginationDto } from "src/shared/dto/paginationDto";

export interface ApplyCoursesRepository {
    save(applyCourses: ApplyCourses): Promise<ApplyCourses>
    findAll(query: PaginationDto): Promise<PaginatedResponse<ApplyCourses>>
    findOne(id: number): Promise<ApplyCourses|null>
    update(id: number, applyCourses: ApplyCourses): Promise<ApplyCourses>
    hardDelete(id: number): Promise<{ message: string }>
    softDelete(id: number): Promise<{ message: string }>
    restore(id: number): Promise<{ message: string }>
}