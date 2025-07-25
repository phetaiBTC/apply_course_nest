import { PaginationDto } from "src/shared/dto/paginationDto";
import { CourseCategory } from "./course_category";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

export interface CourseCategoryRepository {
    save(category: CourseCategory): Promise<CourseCategory>;
    update(id: number, category: CourseCategory): Promise<CourseCategory>;
    findOne(id: number): Promise<CourseCategory | null>;
    hardDelete(id: number): Promise<{ message: string }>;
    softDelete(id: number): Promise<{ message: string }>;
    restore(id: number): Promise<{ message: string }>;
    findByName(name: string): Promise<CourseCategory | null>;
    findAll(pagination: PaginationDto): Promise<PaginatedResponse<CourseCategory>>;
}