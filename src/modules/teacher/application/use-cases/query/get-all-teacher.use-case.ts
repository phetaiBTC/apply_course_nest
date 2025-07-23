import { Inject, Injectable } from "@nestjs/common";
import { Teacher } from "src/modules/teacher/domain/teacher";
import { TeacherRepository } from "src/modules/teacher/domain/teacher.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllTeacherUseCase {
    constructor(
        @Inject('TeacherRepository')
        private readonly teacherRepository: TeacherRepository
    ) { }
    async execute(query: PaginationDto): Promise<PaginatedResponse<Teacher>> {
        return this.teacherRepository.findAll(query);
    }
}