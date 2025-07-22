import { Inject, NotFoundException } from "@nestjs/common";
import { Student } from "src/modules/student/domain/student";
import { StudentRepository } from "src/modules/student/domain/student.repository";

export class GetOneStudentUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository
    ) {}

    async execute(id: number): Promise<Student> {
        const student = await this.studentRepository.findOne(id);
        if (!student) throw new NotFoundException('Student not found');
        return student;
    }
}