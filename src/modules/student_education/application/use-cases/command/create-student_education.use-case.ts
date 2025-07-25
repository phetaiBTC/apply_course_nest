import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Student_educationRepository } from "src/modules/student_education/domain/student_education.repository";
import { CreateEducationDto } from "../../dto/create-student_education.dto";
import { GetOneStudentUseCase } from "src/modules/student/application/use-cases/query/get-one-student.use-case";
import { StudentMapper } from "src/modules/student/mapper/student.mapper";
import { StudentEducationsEntity } from "src/infrastructure/typeorm/student_educations.orm-entity";
import { Student_educationMapper } from "src/modules/student_education/mapper/student_education.mapper";

@Injectable()
export class CreateEducationUseCase {
    constructor(
        @Inject('Student_educationRepository')
        private readonly educationRepository: Student_educationRepository,
        private readonly getOneStudentUseCase: GetOneStudentUseCase
    ) { }

    async execute(dto: CreateEducationDto) {
        const student = await this.getOneStudentUseCase.execute(dto.student_id)
        if (!student) throw new NotFoundException("student not found")
        const studentOrm = StudentMapper.toOrm(student)
        const education = new StudentEducationsEntity();
        education.level = dto.level;
        education.field_of_study = dto.field_of_study;
        education.current_occupation = dto.current_occupation;
        education.work_experience = dto.work_experience;
        education.status = dto.status;
        education.student_id = studentOrm;
        return this.educationRepository.save(Student_educationMapper.toDomain(education))
    }
}