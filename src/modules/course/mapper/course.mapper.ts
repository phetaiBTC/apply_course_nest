import { CoursesEntity } from "src/infrastructure/typeorm/courses.orm-entity";
import { Course } from "../domain/course";
import { TeacherMapper } from "src/modules/teacher/mapper/teacher.mapper";
import { CourseCategoryMapper } from "src/modules/course_category/mapper/course_category.mapper";
import { formatTimeStamp, formatTimeUtil } from "src/shared/utils/formatTime.util";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { IPagination } from "src/shared/interface/pagination-interface";
import { CourseResponse } from "../interface/course.interface";

export class CourseMapper {
    static toDomain(entity: CoursesEntity): Course {
        return new Course({
            id: entity.id,
            title: entity.title,
            max_student: entity.max_student,
            duration_hours: entity.duration_hours,
            price: entity.price,
            registration_start_date: entity.registration_start_date,
            registration_end_date: entity.registration_end_date,
            start_date: entity.start_date,
            end_date: entity.end_date,
            description: entity.description,
            status: entity.status,
            teacher: TeacherMapper.toDomain(entity.teacher),
            category: CourseCategoryMapper.toDomain(entity.category)
        });
    }

    static toOrm(domain: Course): CoursesEntity {
        const entity = new CoursesEntity();
        if (domain.id !== undefined) entity.id = domain.id;
        entity.title = domain.title;
        entity.max_student = domain.max_student;
        entity.duration_hours = domain.duration_hours;
        entity.price = domain.price;
        entity.registration_start_date = domain.registration_start_date;
        entity.registration_end_date = domain.registration_end_date;
        entity.start_date = domain.start_date;
        entity.end_date = domain.end_date;
        if (domain.description !== undefined) entity.description = domain.description;
        entity.status = domain.status;
        entity.teacher = TeacherMapper.toOrm(domain.teacher);
        entity.category = CourseCategoryMapper.toOrm(domain.category);
        return entity;
    }
    static toResponse(domain: Course): CourseResponse {
        return {
            id: domain.id,
            title: domain.title,
            max_student: domain.max_student,
            duration_hours: domain.duration_hours,
            price: domain.price,
            registration_start_date: formatTimeUtil(domain.registration_start_date),
            registration_end_date: formatTimeUtil(domain.registration_end_date),
            start_date: formatTimeUtil(domain.start_date),
            end_date: formatTimeUtil(domain.end_date),
            description: domain.description,
            status: domain.status,
            teacher: TeacherMapper.toResponse(domain.teacher),
            category: CourseCategoryMapper.toResponse(domain.category),
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
        }
    }

    static toResponseList(domain: Course[], pagination: IPagination): PaginatedResponse<CourseResponse> {
        return {
            data: domain.map(user => this.toResponse(user)),
            pagination
        };
    }
}