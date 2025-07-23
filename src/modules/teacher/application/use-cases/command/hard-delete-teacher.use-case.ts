import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TeacherRepository } from "src/modules/teacher/domain/teacher.repository";

@Injectable()
export class HardDeleteTeacherUseCase{
    constructor(
        @Inject('TeacherRepository') private readonly teacherRepository: TeacherRepository,
    ) { }

    async execute(id: number){
        return await this.teacherRepository.hardDelete(id);
    }
}