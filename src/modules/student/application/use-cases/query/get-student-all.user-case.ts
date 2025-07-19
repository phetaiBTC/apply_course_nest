import { Inject, Injectable } from "@nestjs/common";
import { Student } from "src/modules/student/domain/student.entity";
import { StudentRepository } from "src/modules/student/domain/student.repository";
import { User } from "src/modules/user/domain/user.entity";
import { UserRepository } from "src/modules/user/domain/user.repository";
import { PaginationQueryDto } from "src/shared/dto/pagination-query.dto";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";
@Injectable()
export class GetStudentAllUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
    ) { }
    async execute(paginationQuery: PaginationQueryDto): Promise<IpaginationQuery<Student[]>> {
        return this.studentRepository.findAll(paginationQuery);
    }
}