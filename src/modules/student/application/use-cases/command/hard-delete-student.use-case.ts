import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { StudentRepository } from "src/modules/student/domain/student.repository";

@Injectable()
export class HardDeleteStudentUseCase {
    constructor(
        @Inject('StudentRepository') private readonly studentRepository: StudentRepository
    ){}

    async execute(id: number){
        return await this.studentRepository.hardDelete(id);
    }
}