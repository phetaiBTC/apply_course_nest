import { TeacherEntity } from "src/infrastructure/typeorm/teacher.orm-entity";
import { Teacher } from "../domain/teacher";
import { UserMapper } from "src/modules/user/mapper/user.mapper";
import { formatTimeStamp } from "src/shared/utils/formatTime.util";
import { IPagination } from "src/shared/interface/pagination-interface";

export class TeacherMapper {
    static toDomain(entity: TeacherEntity): Teacher {
        return new Teacher({
            id: entity.id,
            specialization: entity.specialization,
            experience: entity.experience,
            education: entity.education,
            user: UserMapper.toDomain(entity.user),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        });
    }
    static toOrm(domain: Teacher): TeacherEntity {
        const entity = new TeacherEntity();
        if (domain.id !== undefined) entity.id = domain.id;
        entity.specialization = domain.specialization;
        entity.experience = domain.experience;
        entity.education = domain.education;
        entity.user = UserMapper.toOrm(domain.user!);
        return entity;
    }

    static toResponse(domain: Teacher) {
        return {
            id: domain.id,
            name: domain.user.name,
            surname: domain.user.surname,
            email: domain.user.email,
            specialization: domain.specialization,
            experience: domain.experience,
            education: domain.education,
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
        }
    }
    static toResponseList(teacher: Teacher[], pagination: IPagination) {
        return {
            data: teacher.map(user => this.toResponse(user)),
            pagination
        };
    }
}