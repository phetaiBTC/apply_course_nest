import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseCategoriesEntity } from "src/infrastructure/typeorm/course_categories.orm-entity";
import { Repository } from "typeorm";
import { CourseCategory } from "../domain/course_category";
import { CourseCategoryMapper } from "../mapper/course_category.mapper";
import { CourseCategoryRepository } from "../domain/course_category.repository";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { fetchWithPagination } from "src/shared/utils/pagination.builder";

@Injectable()
export class CourseCategoryRepositoryOrm implements CourseCategoryRepository {
    constructor(
        @InjectRepository(CourseCategoriesEntity)
        private readonly courseCategoryRepository: Repository<CourseCategoriesEntity>,
    ) { }

    async save(category: CourseCategory): Promise<CourseCategory> {
        const entity = CourseCategoryMapper.toOrm(category);
        return CourseCategoryMapper.toDomain(await this.courseCategoryRepository.save(entity));
    }

    async findByName(name: string): Promise<CourseCategory | null> {
        const entity = await this.courseCategoryRepository.findOne({ where: { name: name }, withDeleted: true });
        return entity ? CourseCategoryMapper.toDomain(entity) : null;
    }

    async findOne(id: number): Promise<CourseCategory | null> {
        const entity = await this.courseCategoryRepository.findOne({ where: { id: id }, withDeleted: true });
        return entity ? CourseCategoryMapper.toDomain(entity) : null;
    }

    async hardDelete(id: number): Promise<{ message: string; }> {
        await this.courseCategoryRepository.delete(id);
        return { message: 'Category deleted' };
    }

    async softDelete(id: number): Promise<{ message: string; }> {
        await this.courseCategoryRepository.softDelete(id);
        return { message: 'Category deleted' };
    }

    async restore(id: number): Promise<{ message: string; }> {
        await this.courseCategoryRepository.restore(id);
        return { message: 'Category restored' };
    }

    async update(id: number, category: CourseCategory): Promise<CourseCategory> {
        const entity = CourseCategoryMapper.toOrm(category);
        entity.id = id;
        return CourseCategoryMapper.toDomain(await this.courseCategoryRepository.save(entity));
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<CourseCategory>> {
        const qb = this.courseCategoryRepository.createQueryBuilder('course_category')
            .withDeleted()
        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'course_category.name'
            },
            is_active: query.is_active,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            toDomain: CourseCategoryMapper.toDomain,
        });
    }
}