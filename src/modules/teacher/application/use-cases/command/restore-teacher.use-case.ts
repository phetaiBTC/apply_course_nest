import { Inject, Injectable } from "@nestjs/common";
import { TeacherRepository } from "src/modules/teacher/domain/teacher.repository";
@Injectable()
export class RestoreTeacherUseCase {
    constructor(
        @Inject('TeacherRepository') private readonly teacherRepository: TeacherRepository,
    ) { }

    async execute(id: number) {
        return await this.teacherRepository.restore(id);
    }
}