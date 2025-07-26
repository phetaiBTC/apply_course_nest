import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplyCoursesEntity } from "src/infrastructure/typeorm/apply_courses.orm-entity";
import { Repository } from "typeorm";
import { ApplyCoursesRepository } from "../domain/apply_courses.repository";
import { ApplyCourses } from "../domain/apply_courses";
import { ApplyCoursesMapper } from "../mapper/apply_courses.mapper";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { fetchWithPagination } from "src/shared/utils/pagination.builder";

@Injectable()
export class ApplyCoursesRepositoryOrm implements ApplyCoursesRepository {
    constructor(
        @InjectRepository(ApplyCoursesEntity)
        private readonly applyCoursesRepository: Repository<ApplyCoursesEntity>,
    ) { }

    async findOne(id: number): Promise<ApplyCourses | null> {
        const applyCourses = await this.applyCoursesRepository.findOne({ where: { id }, withDeleted: true, relations: ['student', 'course', 'student.user', 'course.teacher', 'course.teacher.user', 'course.category'] });
        return applyCourses ? ApplyCoursesMapper.toDomain(applyCourses) : null
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<ApplyCourses>> {
        const qb = this.applyCoursesRepository.createQueryBuilder('apply_courses')
        qb.withDeleted()
            .leftJoinAndSelect('apply_courses.student', 'student')
            .leftJoinAndSelect('apply_courses.course', 'course')
            .leftJoinAndSelect('student.user', 'user')
            .leftJoinAndSelect('course.teacher', 'teacher')
            .leftJoinAndSelect('teacher.user', 'user_teacher')
            .leftJoinAndSelect('course.category', 'category');
        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'apply_courses.reason'
            },
            is_active: query.is_active,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            toDomain: ApplyCoursesMapper.toDomain,
        })
    }
    async save(applyCourses: ApplyCourses): Promise<ApplyCourses> {
        const applyCoursesOrm = ApplyCoursesMapper.toOrm(applyCourses);
        return ApplyCoursesMapper.toDomain(await this.applyCoursesRepository.save(applyCoursesOrm));
    }

    async update(id: number, applyCourses: ApplyCourses): Promise<ApplyCourses> {
        const applyCoursesOrm = ApplyCoursesMapper.toOrm(applyCourses);
        return ApplyCoursesMapper.toDomain(await this.applyCoursesRepository.save({ ...applyCoursesOrm, id }));
    }

    async hardDelete(id: number): Promise<{ message: string }> {
        await this.applyCoursesRepository.delete({ id });
        return { message: 'ApplyCourses deleted successfully' };
    }

    async softDelete(id: number): Promise<{ message: string }> {
        await this.applyCoursesRepository.softDelete({ id });
        return { message: 'ApplyCourses deleted successfully' };
    }

    async restore(id: number): Promise<{ message: string }> {
        await this.applyCoursesRepository.restore({ id });
        return { message: 'ApplyCourses restored successfully' };
    }
}