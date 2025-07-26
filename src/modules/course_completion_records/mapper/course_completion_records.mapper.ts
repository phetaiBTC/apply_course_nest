import { CourseCompletionRecordsEntity } from "src/infrastructure/typeorm/course_completion_records.orm-entity";
import { CourseCompletionRecords } from "../domain/course_completion_records";
import { ApplyCoursesMapper } from "src/modules/apply_courses/mapper/apply_courses.mapper";
import { UserMapper } from "src/modules/user/mapper/user.mapper";
import { formatTimeStamp, formatTimeUtil } from "src/shared/utils/formatTime.util";
import { IPagination } from "src/shared/interface/pagination-interface";
import { CourseCompletionRecordsResponse } from "../interface/course_completion_records.interface";

export class CourseCompletionRecordsMapper {
    static toDomain(entity: CourseCompletionRecordsEntity): CourseCompletionRecords {
        return new CourseCompletionRecords({
            id: entity.id,
            apply_course: ApplyCoursesMapper.toDomain(entity.apply_course),
            total_score: entity.total_score,
            is_certified: entity.is_certified,
            status: entity.status,
            completion_date: entity.completion_date,
            certificate_issued_date: entity.certificate_issued_date,
            total_study_hours: entity.total_study_hours,
            created_by: UserMapper.toDomain(entity.created_by),
        });
    }

    static toOrm(domain: CourseCompletionRecords): CourseCompletionRecordsEntity {
        const entity = new CourseCompletionRecordsEntity();
        if (domain.id) entity.id = domain.id;
        entity.apply_course = ApplyCoursesMapper.toOrm(domain.apply_course!);
        entity.total_score = domain.total_score;
        entity.is_certified = domain.is_certified;
        entity.status = domain.status;
        entity.completion_date = domain.completion_date;
        entity.certificate_issued_date = domain.certificate_issued_date;
        entity.total_study_hours = domain.total_study_hours;
        entity.created_by = UserMapper.toOrm(domain.created_by!);
        return entity;
    }

    static toResponse(domain: CourseCompletionRecords): CourseCompletionRecordsResponse {
        return {
            id: domain.id,
            apply_course: ApplyCoursesMapper.toResponse(domain.apply_course!),
            total_score: domain.total_score,
            is_certified: domain.is_certified,
            status: domain.status,
            completion_date: formatTimeUtil(domain.completion_date),
            certificate_issued_date: formatTimeUtil(domain.certificate_issued_date),
            total_study_hours: domain.total_study_hours,
            created_by: UserMapper.toResponse(domain.created_by!),
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
        }
    }
    static toResponseList(course_completion_records: CourseCompletionRecords[], pagination: IPagination): { data: CourseCompletionRecordsResponse[], pagination: IPagination } {
        return {
            data: course_completion_records.map(c => this.toResponse(c)),
            pagination: pagination,
        }
    }
}