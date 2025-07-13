
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { Student } from "../../domain/student.entity";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";

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
        orm.createdAt = student.data.createdAt!;
        orm.updatedAt = student.data.updatedAt!;
        return orm;
    }
}

