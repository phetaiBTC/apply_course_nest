import { Permission } from "src/modules/permission/domain/permission";

export interface RoleProps {
  id?: number;
  name: string;
  display_name?: string;
  permissions?:Permission[]
}

export class Role {
  public id?: number;
  public name: string;
  public display_name?: string;
  public permissions:Permission[]

  constructor(props: RoleProps) {
    this.id = props.id;
    this.name = props.name;
    this.display_name = props.display_name;
    this.permissions = props.permissions ?? [];
  }
}