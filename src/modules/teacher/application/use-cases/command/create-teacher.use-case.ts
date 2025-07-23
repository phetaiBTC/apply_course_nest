import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { User } from "src/modules/user/domain/user";
import { hashPassword } from "src/shared/utils/bcrypt.util";
import { UserRepository } from "src/modules/user/domain/user.repository";
import { CreateTeacherDto } from "../../dto/create-teacher.dto";
import { Teacher } from "src/modules/teacher/domain/teacher";
import { TeacherRepository } from "src/modules/teacher/domain/teacher.repository";

@Injectable()
export class CreateTeacherUseCase {
    constructor(
        @Inject('TeacherRepository') private readonly teacherRepository: TeacherRepository,
        @Inject('UserRepository')
        private readonly userRepository: UserRepository
    ) { }

    async execute(dto: CreateTeacherDto): Promise<Teacher> {
        const userExists = await this.userRepository.findByEmail(dto.email);
        if (userExists) throw new BadRequestException('User already exists');
        
        const user = new User({
            name: dto.name,
            surname: dto.surname,
            email: dto.email,
            password: await hashPassword(dto.password),
            is_verified: true
        })
        const teacher = new Teacher({
            specialization: dto.specialization,
            experience: dto.experience,
            education: dto.education,
            user
        })
        return await this.teacherRepository.save(teacher, user);
    }
}