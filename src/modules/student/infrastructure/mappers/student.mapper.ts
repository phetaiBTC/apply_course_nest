// // modules/user/infrastructure/user.mapper.ts
// import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
// import { User } from '../../domain/user.entity';

import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { Student } from "../../domain/student.entity";
import { StudentModule } from "../../student.module";
import { User } from "src/modules/user/domain/user.entity";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";

// export class UserMapper {
//     static toDomain(orm: UserEntity): User {
//         return new User(
//             orm.id,
//             orm.name,
//             orm.email,
//             orm.surname,
//             orm.password,
//             orm.createdAt,
//             orm.updatedAt,
//             orm.deletedAt,
//         );
//     }

//     static toOrm(user: User): UserEntity {
//         const orm = new UserEntity();
//         orm.name = user.name;
//         orm.email = user.email;
//         orm.surname = user.surname;
//         orm.password = user.password;
//         orm.createdAt = user.createdAt!;
//         orm.updatedAt = user.updatedAt!;
//         orm.deletedAt = user.deletedAt!;
//         return orm;
//     }

// }

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
}

