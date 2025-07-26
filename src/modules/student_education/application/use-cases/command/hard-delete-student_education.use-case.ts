import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Student_educationRepository } from "src/modules/student_education/domain/student_education.repository";

@Injectable()
export class HardDeleteEducationUseCase {
    constructor(@Inject('Student_educationRepository') private readonly educationRepository: Student_educationRepository) { }
    execute(id: number) {
        const educationExists = this.educationRepository.findOne(id);
        if (!educationExists) throw new NotFoundException('education not found');
        return this.educationRepository.hardDelete(id);
    }
}