import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { CourseCompletionRecords } from "./course_completion_records";
import { PaginationDto } from "src/shared/dto/paginationDto";

export interface CourseCompletionRecordsRepository {
    getOne(id: number): Promise<CourseCompletionRecords | null>
    save(course_completion_records: CourseCompletionRecords): Promise<CourseCompletionRecords>
    findAll(query: PaginationDto): Promise<PaginatedResponse<CourseCompletionRecords>>
    hardDelete(id: number): Promise<{ message: string }>
    softDelete(id: number): Promise<{ message: string }>
    restore(id: number): Promise<{ message: string }>
    update(id: number, course_completion_records: CourseCompletionRecords): Promise<CourseCompletionRecords>
}