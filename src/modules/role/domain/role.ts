export interface RoleProps {
  id?: number;
  name: string;
  display_name?: string;
}

export class Role {
  public id?: number;
  public name: string;
  public display_name?: string;

  constructor(props: RoleProps) {
    this.id = props.id;
    this.name = props.name;
    this.display_name = props.display_name;
  }
}