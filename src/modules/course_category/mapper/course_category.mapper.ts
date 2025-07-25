import { CourseCategoriesEntity } from "src/infrastructure/typeorm/course_categories.orm-entity";
import { CourseCategory } from "../domain/course_category";
import { formatTimeStamp } from "src/shared/utils/formatTime.util";
import { CourseCategoryResponse } from "../interface/course_category.interface";
import { IPagination } from "src/shared/interface/pagination-interface";

export class CourseCategoryMapper {
    static toDomain(entity: CourseCategoriesEntity): CourseCategory {
        return {
            id: entity.id,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt
        };
    }
    static toOrm(domain: CourseCategory): CourseCategoriesEntity {
        const entity = new CourseCategoriesEntity();
        if (domain.id !== undefined) entity.id = domain.id;
        entity.name = domain.name;
        return entity;
    }
    static toResponse(domain: CourseCategory): CourseCategoryResponse {
        return {
            id: domain.id,
            name: domain.name,
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
        };
    }

    static toResponseList(domain: CourseCategory[], pagination: IPagination): { data: CourseCategoryResponse[], pagination: IPagination } {
        return {
            data: domain.map(user => this.toResponse(user)),
            pagination
        };
    }
}