import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Student_educationRepository } from "src/modules/student_education/domain/student_education.repository";
import { UpdateEducationDto } from "../../dto/update-student_education.dto";
import { StudentEducationsEntity } from "src/infrastructure/typeorm/student_educations.orm-entity";
import { StudentMapper } from "src/modules/student/mapper/student.mapper";
import { Student_educationMapper } from "src/modules/student_education/mapper/student_education.mapper";

@Injectable()
export class UpdateEducationUseCase {
    constructor(@Inject('Student_educationRepository') private readonly educationRepository: Student_educationRepository) { }
    async execute(id: number, dto: UpdateEducationDto) {
        const educationExists = await this.educationRepository.findOne(id);
        if (!educationExists) throw new NotFoundException("Education not found")
        const education = new StudentEducationsEntity();
        education.level = dto.level || educationExists.level;
        education.field_of_study = dto.field_of_study || educationExists.field_of_study;
        education.current_occupation = dto.current_occupation || educationExists.current_occupation;
        education.work_experience = dto.work_experience || educationExists.work_experience;
        education.status = dto.status || educationExists.status;
        education.student_id = StudentMapper.toOrm(educationExists.student_id);
        return this.educationRepository.update(id, Student_educationMapper.toDomain(education))
    }
}