import { Inject, NotFoundException } from "@nestjs/common";
import { Teacher } from "src/modules/teacher/domain/teacher";
import { TeacherRepository } from "src/modules/teacher/domain/teacher.repository";

export class GetOneTeacherUseCase {
    constructor(
        @Inject('TeacherRepository')
        private readonly teacherRepository: TeacherRepository
    ) { }

    async execute(id: number): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne(id);
        if (!teacher) throw new NotFoundException('teacher not found');
        return teacher;
    }
}