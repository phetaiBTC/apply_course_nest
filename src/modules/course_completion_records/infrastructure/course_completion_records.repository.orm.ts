import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseCompletionRecordsEntity } from "src/infrastructure/typeorm/course_completion_records.orm-entity";
import { Repository } from "typeorm";
import { CourseCompletionRecordsRepository } from "../domain/course_completion_records.repository";
import { CourseCompletionRecords } from "../domain/course_completion_records";
import { CourseCompletionRecordsMapper } from "../mapper/course_completion_records.mapper";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { fetchWithPagination } from "src/shared/utils/pagination.builder";

@Injectable()
export class CourseCompletionRecordsRepositoryOrm implements CourseCompletionRecordsRepository {
    constructor(
        @InjectRepository(CourseCompletionRecordsEntity)
        private readonly courseCompletionRecordsRepository: Repository<CourseCompletionRecordsEntity>,
    ) { }

    async getOne(id: number): Promise<CourseCompletionRecords | null> {
        const entity = await this.courseCompletionRecordsRepository.findOne({ where: { id }, withDeleted: true, relations: ['apply_course', 'apply_course.student', 'apply_course.student.user', 'created_by', 'apply_course.course', 'apply_course.course.teacher', 'apply_course.course.teacher.user', 'apply_course.course.category'] });
        return entity ? CourseCompletionRecordsMapper.toDomain(entity) : null;
    }

    async save(course_completion_records: CourseCompletionRecords): Promise<CourseCompletionRecords> {
        const course_completion_recordsOrm = CourseCompletionRecordsMapper.toOrm(course_completion_records);
        return CourseCompletionRecordsMapper.toDomain(await this.courseCompletionRecordsRepository.save(course_completion_recordsOrm));
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<CourseCompletionRecords>> {
        const qb = this.courseCompletionRecordsRepository.createQueryBuilder('course_completion_records')
            .withDeleted()
            .leftJoinAndSelect('course_completion_records.apply_course', 'apply_course')
            .leftJoinAndSelect('apply_course.student', 'student')
            .leftJoinAndSelect('student.user', 'user')
            .leftJoinAndSelect('apply_course.course', 'course')
            .leftJoinAndSelect('course.teacher', 'teacher')
            .leftJoinAndSelect('course.category', 'category')
            .leftJoinAndSelect('teacher.user', 'user_teacher')
            .leftJoinAndSelect('course_completion_records.created_by', 'created_by')
        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'course.title'
            },
            is_active: query.is_active,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            toDomain: CourseCompletionRecordsMapper.toDomain,
        })
    }

    async hardDelete(id: number): Promise<{ message: string; }> {
        await this.courseCompletionRecordsRepository.delete(id);
        return { message: 'CourseCompletionRecords deleted' };
    }

    async softDelete(id: number): Promise<{ message: string; }> {
        await this.courseCompletionRecordsRepository.softDelete(id);
        return { message: 'CourseCompletionRecords deleted' };
    }

    async restore(id: number): Promise<{ message: string; }> {
        await this.courseCompletionRecordsRepository.restore(id);
        return { message: 'CourseCompletionRecords restored' };
    }

    async update(id: number, course_completion_records: CourseCompletionRecords): Promise<CourseCompletionRecords> {
        const course_completion_recordsOrm = CourseCompletionRecordsMapper.toOrm(course_completion_records);
        course_completion_recordsOrm.id = id
        return CourseCompletionRecordsMapper.toDomain(await this.courseCompletionRecordsRepository.save(course_completion_recordsOrm));
    }
}