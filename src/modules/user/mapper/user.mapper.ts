import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { User } from "../domain/user";
import { Role } from "src/modules/role/domain/role";
import { Permission } from "src/modules/permission/domain/permission";
import { RoleEntity } from "src/infrastructure/typeorm/role.orm-entity";
import { PermissionsEntity } from "src/infrastructure/typeorm/permissions.orm-entity";
import { formatTimeStamp } from "src/shared/utils/formatTime.util";
import { IPagination } from "src/shared/interface/pagination-interface";
import { permission } from "process";


export class UserMapper {

    static toDomain(entity: UserEntity): User {
        return new User({
            id: entity.id,
            name: entity.name,
            surname: entity.surname,
            email: entity.email,
            password: entity.password,
            is_verified: entity.is_verified,
            roles: entity.roles,
            permissions: entity.permissions,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt
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
            roleEntity.id = r.id!;
            return roleEntity;
        });

        entity.permissions = domain.permissions.map(p => {
            const permissionEntity = new PermissionsEntity();
            permissionEntity.id = p.id!;
            return permissionEntity;
        });
        // console.log(entity);


        return entity;
    }
    static toResponse(domain: User) {
        return {
            id: domain.id,
            name: domain.name,
            surname: domain.surname,
            email: domain.email,
            is_verified: domain.is_verified,
            roles: domain.roles ? domain.roles.map(r => ({
                id: r.id,
                name: r.name,
                display_name: r.display_name,
                permissions: r.permissions ? r.permissions.map(p => ({
                    id: p.id,
                    name: p.name || '',
                    display_name: p.display_name || ''
                })) : r.permissions
            })) : domain.roles,
            permissions: domain.permissions ? domain.permissions.map(p => ({
                id: p.id,
                name: p.name || '',
                display_name: p.display_name || ''
            })) : domain.permissions,
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt)
        };
    }
    static toResponseList(users: User[], pagination: IPagination) {
        return {
            data: users.map(user => this.toResponse(user)),
            pagination
        };
    }
}

