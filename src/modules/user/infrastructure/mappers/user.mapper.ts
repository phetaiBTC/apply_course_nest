// modules/user/infrastructure/user.mapper.ts
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { User } from '../../domain/user.entity';

export class UserMapper {
    static toDomain(orm: UserEntity): User {
        return new User(
            orm.id,
            orm.name,
            orm.email,
            orm.surname,
            orm.password,
            orm.createdAt,
            orm.updatedAt,
            orm.deletedAt,
        );
    }

    static toOrm(user: User): UserEntity {
        const orm = new UserEntity();
        orm.name = user.name;
        orm.email = user.email;
        orm.surname = user.surname;
        orm.password = user.password;
        orm.createdAt = user.createdAt!;
        orm.updatedAt = user.updatedAt!;
        orm.deletedAt = user.deletedAt!;
        return orm;
    }

}
