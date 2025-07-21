import { Inject, Injectable } from "@nestjs/common";
import { Student } from "src/modules/student/domain/student.entity";
import { StudentRepository } from "src/modules/student/domain/student.repository";
import { GetStudentByIdUseCase } from "../query/get-student-by-id.use-case";
import { UpdateStudentDto } from "../../dto/update-student.dto";

@Injectable()
export class UpdateStudentUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
        private readonly getStudentByIdUseCase: GetStudentByIdUseCase
    ) { }

    async execute(id: number, student: UpdateStudentDto): Promise<{ message: string }> {
        const existingStudent = await this.getStudentByIdUseCase.execute(id);
        if (!existingStudent) throw new Error('Student not found');

        const updatedStudentData = {
            ...existingStudent.data,
            ...student
        };
        const studentEntity = new Student(updatedStudentData);
        // console.log(studentEntity);

        return this.studentRepository.update(id, studentEntity);
    }

}