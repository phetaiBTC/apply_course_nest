import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Student } from "src/modules/student/domain/student";
import { StudentRepository } from "src/modules/student/domain/student.repository";
import { CreateStudentDto } from "../../dto/create-student.dto";
import { User } from "src/modules/user/domain/user";
import { hashPassword } from "src/shared/utils/bcrypt.util";
import { UserRepository } from "src/modules/user/domain/user.repository";

@Injectable()
export class CreateStudentUseCase {
    constructor(
        @Inject('StudentRepository') private readonly studentRepository: StudentRepository,
        @Inject('UserRepository')
        private readonly userRepository: UserRepository
    ) { }

    async execute(dto: CreateStudentDto): Promise<Student> {
        const userExists = await this.userRepository.findByEmail(dto.email);
        if (userExists) throw new BadRequestException('User already exists');
        const student = new Student({
            name: dto.name,
            surname: dto.surname
        });
        const user = new User({
            name: dto.name,
            surname: dto.surname,
            email: dto.email,
            password: await hashPassword(dto.password)
        })
        return await this.studentRepository.save(student, user);
    }
}