import { Inject, Injectable } from "@nestjs/common";
import { Student_educationRepository } from "src/modules/student_education/domain/student_education.repository";

@Injectable()
export class HardDeleteEducationUseCase {
    constructor(@Inject('Student_educationRepository') private readonly educationRepository: Student_educationRepository) { }
    execute(id:number) {
        // return this.educationRepository.hardDelete(dto.id)
    }
}