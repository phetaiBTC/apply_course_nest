import { StudentEducationsEntity } from "src/infrastructure/typeorm/student_educations.orm-entity";
import { Student_education } from "../domain/student_education";
import { Student } from "src/modules/student/domain/student";
import { StudentMapper } from "src/modules/student/mapper/student.mapper";
import { formatTimeStamp } from "src/shared/utils/formatTime.util";

export class Student_educationMapper {
    static toDomain(entity: StudentEducationsEntity): Student_education {
        // console.log(entity);
        return new Student_education({
            id: entity.id,
            level: entity.level,
            field_of_study: entity.level,
            current_occupation: entity.current_occupation,
            work_experience: entity.work_experience,
            status: entity.status,
            student_id: StudentMapper.toDomain(entity.student_id)
        })
    }
    static toOrm(domain: Student_education): StudentEducationsEntity {
        const entity = new StudentEducationsEntity();
        if (domain.id) entity.id = domain.id;
        entity.level = domain.level
        entity.field_of_study = domain.field_of_study
        entity.current_occupation = domain.current_occupation
        entity.work_experience = domain.work_experience
        entity.status = domain.status
        entity.student_id = StudentMapper.toOrm(domain.student_id)
        return entity
    }

    static toResponse(domain: Student_education) {
        return {
            id: domain.id,
            level: domain.level,
            field_of_study: domain.field_of_study,
            current_occupation: domain.current_occupation,
            work_experience: domain.work_experience,
            status: domain.status,
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
        }
    }
}