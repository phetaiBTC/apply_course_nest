import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { StudentRepository } from "src/modules/student/domain/student.repository";

@Injectable()
export class HardDeleteStudentUseCase {
    constructor(
        @Inject('StudentRepository') private readonly studentRepository: StudentRepository
    ){}

    async execute(id: number){
        const student = await this.studentRepository.findOne(id);
        if (!student) throw new NotFoundException('Student not found');
        return await this.studentRepository.hardDelete(id);
    }
}