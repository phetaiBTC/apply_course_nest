import { Role } from "src/modules/role/domain/role";
import { Permission } from 'src/modules/permission/domain/permission';

export interface UserProps {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  is_verified?: boolean;
  roles?: Role[];
  permissions?: Permission[];
}

export class User {
  public id?: number;
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public is_verified: boolean;
  public roles: Role[];
  public permissions: Permission[];

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.surname = props.surname;
    this.email = props.email;
    this.password = props.password;
    this.is_verified = props.is_verified ?? false;
    this.roles = props.roles ?? [];
    this.permissions = props.permissions ?? [];
  }

  verify() {
    this.is_verified = true;
  }

  addRole(role: Role) {
    this.roles.push(role);
  }

  addPermission(permission: Permission) {
    this.permissions.push(permission);
  }
}