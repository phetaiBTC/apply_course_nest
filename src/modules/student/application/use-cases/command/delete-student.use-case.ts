import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { StudentRepository } from "src/modules/student/domain/student.repository";
import { createStudentDto } from "../../dto/create-student.dto";
import { GetUserByEmailUseCase } from "src/modules/user/application/use-cases/query/get-user-by-email.use-case";
import { Student } from "src/modules/student/domain/student.entity";

@Injectable()
export class DeleteStudentUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
        // private readonly getUserByEmailUseCase: GetUserByEmailUseCase
    ) { }

    async execute(id: number): Promise<{ message: string }> {
        return this.studentRepository.delete(id);
    }
}