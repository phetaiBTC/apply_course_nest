import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { StudentRepository } from "src/modules/student/domain/student.repository";
import { UpdateStudentDto } from "../../dto/update-student.dto";
import { Student } from "src/modules/student/domain/student";
import { DistrictRepository } from "src/modules/district/domain/district.repository";
import { District } from "src/modules/district/domain/district";

@Injectable()
export class UpdateStudentUseCase {
    constructor(
        @Inject('StudentRepository') private readonly studentRepository: StudentRepository,
        @Inject('DistrictRepository') private readonly districtRepository: DistrictRepository
    ) { }

    async execute(id: number, dto: UpdateStudentDto): Promise<Student> {
        const studentExists = await this.studentRepository.findOne(id);
        if (!studentExists) throw new NotFoundException('Student not found');
        let districtExists: District | null = null;
        if (dto.district) {
            districtExists = await this.districtRepository.findOne(dto.district);
        }
        const student = new Student({
            name: dto.name || studentExists.name,
            surname: dto.surname || studentExists.surname,
            birth_date: dto.birth_date || studentExists.birth_date,
            gender: dto.gender || studentExists.gender,
            district: dto.district ? districtExists : studentExists.district
        });

        return await this.studentRepository.update(id, student);
    }

}