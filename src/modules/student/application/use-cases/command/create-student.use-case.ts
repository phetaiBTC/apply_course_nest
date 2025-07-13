import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { StudentRepository } from "src/modules/student/domain/student.repository";
import { createStudentDto } from "../../dto/create-student.dto";
import { GetUserByEmailUseCase } from "src/modules/user/application/use-cases/query/get-user-by-email.use-case";
import { Student } from "src/modules/student/domain/student.entity";

@Injectable()
export class CreateStudentUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
        private readonly getUserByEmailUseCase: GetUserByEmailUseCase
    ) { }

    async execute(dto: createStudentDto): Promise<any> {
        const isUserExist = await this.getUserByEmailUseCase.execute(dto.email);
        if (isUserExist) {
            throw new BadRequestException("User with this email already exists");
        }
        const student = new Student({
            name: dto.name,
            surname: dto.surname,
            email: dto.email,
            password: dto.password
        });
        return this.studentRepository.create(student);
    }
}