import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { Course } from "./course";

export interface CourseRepository {
    findAll(query: PaginationDto): Promise<PaginatedResponse<Course>>;
    save(course: Course): Promise<Course>;
    findCourseExist(course: Course,id?:number): Promise<Course[]>
    findOne(id: number): Promise<Course | null>
    hardDelete(id:number): Promise<{ message: string }>
    softDelete(id: number): Promise<{ message: string }>
    restore(id: number): Promise<{ message: string }>
    update(id: number, course: Course): Promise<Course>
}