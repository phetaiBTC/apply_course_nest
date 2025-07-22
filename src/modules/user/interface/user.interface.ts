import { Permission } from "src/modules/permission/domain/permission";
import { Role } from "src/modules/role/domain/role";

export interface UserProps {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  is_verified?: boolean;
  roles?: Role[];
  permissions?: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;  
}

export interface UserResponse{
    id?: number;
    name: string;
    surname: string;
    email: string;
    is_verified: boolean;
    roles: Role[];
    permissions: Permission[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}