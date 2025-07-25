import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { Student_education } from "./student_education";

export interface Student_educationRepository{
    // getAll():Promise<PaginatedResponse<Student_education>>
    save(educatoin:Student_education):Promise<Student_education>
}