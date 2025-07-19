import { Inject, Injectable } from "@nestjs/common";
import { Student } from "src/modules/student/domain/student.entity";
import { StudentRepository } from "src/modules/student/domain/student.repository";
import { User } from "src/modules/user/domain/user.entity";
import { UserRepository } from "src/modules/user/domain/user.repository";
@Injectable()
export class GetStudentByIdUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
    ) { }
    async execute(id: number): Promise<Student | null> {
        return this.studentRepository.findById(id);
    }
}