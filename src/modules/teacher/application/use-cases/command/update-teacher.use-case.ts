import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TeacherRepository } from "src/modules/teacher/domain/teacher.repository";
import { Teacher } from "src/modules/teacher/domain/teacher";
import { UpdateTeacherDto } from "../../dto/update-teacher.dto";
import { User } from "src/modules/user/domain/user";

@Injectable()
export class UpdateTeacherUseCase {
    constructor(
        @Inject('TeacherRepository') private readonly teacherRepository: TeacherRepository,

    ) { }

    async execute(id: number, dto: UpdateTeacherDto): Promise<Teacher> {
        const teacherExists = await this.teacherRepository.findOne(id);
        if (!teacherExists) throw new NotFoundException('Teacher not found');
        const teacher = new Teacher({
            ...teacherExists,
            ...dto
        });
        const user = new User({
            ...teacherExists.user,
            ...dto
        });
        return await this.teacherRepository.update(id, teacher,user);
    }

}