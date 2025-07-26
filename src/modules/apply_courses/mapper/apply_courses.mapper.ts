import { ApplyCoursesEntity } from "src/infrastructure/typeorm/apply_courses.orm-entity";
import { ApplyCourses } from "../domain/apply_courses";
import { StudentMapper } from "src/modules/student/mapper/student.mapper";
import { CourseMapper } from "src/modules/course/mapper/course.mapper";
import { formatTimeStamp } from "src/shared/utils/formatTime.util";
import { IPagination } from "src/shared/interface/pagination-interface";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { ApplyCoursesResponse } from "../interface/apply_courses.interface";

export class ApplyCoursesMapper {
    static toDomain(entity: ApplyCoursesEntity): ApplyCourses {
        return new ApplyCourses({
            id: entity.id,
            student: StudentMapper.toDomain(entity.student),
            course: CourseMapper.toDomain(entity.course),
            price: entity.price,
            reason: entity.reason,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        });
    }
    static toOrm(domain: ApplyCourses): ApplyCoursesEntity {
        const entity = new ApplyCoursesEntity();
        if (domain.id) entity.id = domain.id;
        entity.student = StudentMapper.toOrm(domain.student);
        entity.course = CourseMapper.toOrm(domain.course);
        entity.price = domain.price;
        if (domain.reason) entity.reason = domain.reason;
        entity.status = domain.status;
        // entity.createdAt = domain.createdAt;
        // entity.updatedAt = domain.updatedAt;
        // entity.deletedAt = domain.deletedAt;
        return entity;
    }
    static toResponse(domain: ApplyCourses):ApplyCoursesResponse {
        return {
            id: domain.id,
            student: StudentMapper.toResponse(domain.student),
            course: CourseMapper.toResponse(domain.course),
            price: domain.price,
            reason: domain.reason,
            status: domain.status,
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
        };
    }
    static toResponseList(domain: ApplyCourses[], pagination: IPagination): PaginatedResponse<ApplyCoursesResponse> {
        return {
            data: domain.map(user => this.toResponse(user)),
            pagination
        };
    }
}