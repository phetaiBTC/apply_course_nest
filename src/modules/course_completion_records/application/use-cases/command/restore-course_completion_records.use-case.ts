import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CourseCompletionRecordsRepository } from "src/modules/course_completion_records/domain/course_completion_records.repository";

@Injectable()
export class RestoreCourseCompletionRecordsUseCase {
    constructor(
        @Inject('CourseCompletionRecordsRepository')
        private readonly courseCompletionRecordsRepository: CourseCompletionRecordsRepository
    ){}

    async execute(id: number) : Promise<{message: string}> {
        const course_completion_records = await this.courseCompletionRecordsRepository.getOne(id)
        if(!course_completion_records) throw new NotFoundException('Course completion records not found')
        return this.courseCompletionRecordsRepository.restore(id)
    }
}