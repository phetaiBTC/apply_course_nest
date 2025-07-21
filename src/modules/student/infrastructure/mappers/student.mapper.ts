
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { Student } from "../../domain/student.entity";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { DistrictEntity } from "src/infrastructure/typeorm/district.orm-entity";

export class StudentMapper {
    static toDomain(orm: StudentEntity, user: UserEntity): Student {
        return new Student(
            {
                id: orm.id,
                name: orm.name,
                email: user.email,
                surname: orm.surname,
                password: user.password,
                createdAt: orm.createdAt,
                updatedAt: orm.updatedAt,
            }
        );
    }
    static toOrm(student: Student): StudentEntity {
        const orm = new StudentEntity();
        orm.name = student.data.name;
        orm.surname = student.data.surname;
        orm.district = { id: student.data.districtId! } as DistrictEntity;
        orm.birth_date = student.data.birth_date!;
        orm.gender = student.data.gender!;
        orm.createdAt = student.data.createdAt!;
        orm.updatedAt = student.data.updatedAt!;
        return orm;
    }
}

