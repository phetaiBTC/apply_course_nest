import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TeacherRepository } from "src/modules/teacher/domain/teacher.repository";

@Injectable()
export class SoftDeleteTeacherUseCase {
    constructor(
        @Inject('TeacherRepository') private readonly teacherRepository: TeacherRepository,
    ) { }

    async execute(id: number) {
        const student = await this.teacherRepository.findOne(id);
        if (!student) throw new NotFoundException('Student not found');
        return await this.teacherRepository.softDelete(id);
    }
}