import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Student_educationRepository } from "src/modules/student_education/domain/student_education.repository";

@Injectable()
export class GetOneEducationUseCase {
    constructor(
        @Inject('Student_educationRepository')
        private readonly educationRepository: Student_educationRepository,
    ) { }

    async execute(id: number) {
        const education = await this.educationRepository.findOne(id);
        if (!education) throw new NotFoundException('education not found');
        return education;
    }
}