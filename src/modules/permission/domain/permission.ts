export interface PermissionProps {
  id?: number;
  name: string;
  display_name?: string;
}

export class Permission {
  public id?: number;
  public name: string;
  public display_name?: string;

  constructor(props: PermissionProps) {
    this.id = props.id;
    this.name = props.name;
    this.display_name = props.display_name;
  }
}