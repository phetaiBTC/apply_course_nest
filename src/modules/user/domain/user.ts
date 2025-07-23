import { Role } from "src/modules/role/domain/role";
import { Permission } from 'src/modules/permission/domain/permission';
import { UserProps } from "../interface/user.interface";
import { hashPassword } from "src/shared/utils/bcrypt.util";



export class User implements UserProps {
  public id?: number;
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public is_verified: boolean;
  public roles: Role[];
  public permissions: Permission[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.surname = props.surname;
    this.email = props.email;
    this.password = props.password;
    this.is_verified = props.is_verified ?? false;
    this.roles = props.roles ?? [];
    this.permissions = props.permissions ?? [];
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt ?? null;
  }
  async changePassword(password: string) {
    this.password = await hashPassword(password);
  }
  verify() {
    this.is_verified = true;
  }

  addRole(role: Role[]) {
    this.roles.push(...role);
  }

  addPermission(permission: Permission[]) {
    this.permissions.push(...permission);
  }
}