import { formatTimeStamp, formatTimeUtil } from "src/shared/utils/formatTime.util";
import { IPagination } from "src/shared/interface/pagination-interface";
import { Student } from "../domain/student";
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { UserMapper } from "src/modules/user/mapper/user.mapper";
import { DistrictMapper } from "src/modules/district/mapper/district.mapper";

export class StudentMapper {

    static toDomain(entity: StudentEntity): Student {
        return new Student({
            id: entity.id,
            name: entity.name,
            surname: entity.surname,
            birth_date: entity.birth_date,
            gender: entity.gender,
            user: UserMapper.toDomain(entity.user),
            district: entity.district ? DistrictMapper.toDomain(entity.district) : null,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt
        });
    }

    static toOrm(domain: Student): StudentEntity {
        const entity = new StudentEntity();
        if (domain.id !== undefined) entity.id = domain.id;
        entity.name = domain.name;
        entity.surname = domain.surname;
        entity.user = UserMapper.toOrm(domain.user!);
        if (domain.birth_date) entity.birth_date = domain.birth_date;
        if (domain.gender) entity.gender = domain.gender;
        if (domain.district) entity.district = DistrictMapper.toOrm(domain.district!);
        return entity;
    }
    static toResponse(domain: Student) {
        return {
            id: domain.id!,
            name: domain.name,
            surname: domain.surname,
            email: domain.user!.email,
            birth_date: domain.birth_date ? formatTimeUtil(domain.birth_date) : null,
            gender: domain.gender ? domain.gender : null,
            district: domain.district ? domain.district.name : null,
            distinct_en: domain.district ? domain.district.name_en : null,
            province: domain.district ? domain.district.province.name : null,
            province_en: domain.district ? domain.district.province.name_en : null,
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt)
        };
    }
    static toResponseList(users: Student[], pagination: IPagination) {
        return {
            data: users.map(user => this.toResponse(user)),
            pagination
        };
    }
}

