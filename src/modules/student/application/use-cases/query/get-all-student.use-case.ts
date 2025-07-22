import { Inject, Injectable } from "@nestjs/common";
import { Student } from "src/modules/student/domain/student";
import { StudentRepository } from "src/modules/student/domain/student.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllStudentUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository
    ) { }
    async execute(query: PaginationDto): Promise<PaginatedResponse<Student>> {
        return this.studentRepository.findAll(query);
    }
}