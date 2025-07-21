import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { User } from "../domain/user";
import { Role } from "src/modules/role/domain/role";
import { Permission } from "src/modules/permission/domain/permission";
import { RoleEntity } from "src/infrastructure/typeorm/role.orm-entity";
import { PermissionsEntity } from "src/infrastructure/typeorm/permissions.orm-entity";


export class UserMapper {
    
    static toDomain(entity: UserEntity): User {
        return new User({
            id: entity.id,
            name: entity.name,
            surname: entity.surname,
            email: entity.email,
            password: entity.password,
            is_verified: entity.is_verified,
            roles: entity.roles?.map(r => new Role({ id: r.id, name: r.name, display_name: r.display_name })) ?? [],
            permissions: entity.permissions?.map(p => new Permission({ id: p.id, name: p.name, display_name: p.display_name })) ?? [],
        });
    }

    static toOrm(domain: User): UserEntity {
        const entity = new UserEntity();
        if (domain.id !== undefined) entity.id = domain.id;
        entity.name = domain.name;
        entity.surname = domain.surname;
        entity.email = domain.email;
        entity.password = domain.password;
        entity.is_verified = domain.is_verified;

        entity.roles = domain.roles.map(r => {
            const roleEntity = new RoleEntity();
            if (r.id !== undefined) roleEntity.id = r.id;
            return roleEntity;
        });

        entity.permissions = domain.permissions.map(p => {
            const permissionEntity = new PermissionsEntity();
            if (p.id !== undefined) permissionEntity.id = p.id;
            return permissionEntity;
        });

        return entity;
    }
}

