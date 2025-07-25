import { Injectable } from "@nestjs/common";
import { Student_educationRepository } from "../domain/student_education.repository";
import { Student_education } from "../domain/student_education";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentEducationsEntity } from "src/infrastructure/typeorm/student_educations.orm-entity";
import { Repository } from "typeorm";
import { Student_educationMapper } from "../mapper/student_education.mapper";

@Injectable()
export class Student_educationRepositoryOrm implements Student_educationRepository {
    constructor(
        @InjectRepository(StudentEducationsEntity)
        private readonly educationRepository: Repository<StudentEducationsEntity>
    ) { }
    async save(education: Student_education): Promise<Student_education> {
        const educatioOrm = Student_educationMapper.toOrm(education)
        const educationCreate = this.educationRepository.create(educatioOrm)
        await this.educationRepository.save(educationCreate)
        return Student_educationMapper.toDomain(educationCreate)
    }

}