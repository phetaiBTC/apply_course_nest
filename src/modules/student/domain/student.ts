
import { Gender } from "src/infrastructure/typeorm/student.orm-entity";
import { District } from "src/modules/district/domain/district";
import { User } from 'src/modules/user/domain/user';

export interface StudentProps {
  id?: number;
  name: string;
  surname: string;
  birth_date?: Date;
  gender?: Gender;
  user?: User;
  district?: District |null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Student {
  public id?: number;
  public name: string;
  public surname: string;
  public birth_date?: Date;
  public gender?: Gender;
  public user?: User;
  public district?: District |null;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;

  constructor(props: StudentProps) {
    this.id = props.id;
    this.name = props.name;
    this.surname = props.surname;
    this.birth_date = props.birth_date;
    this.gender = props.gender;
    this.user = props.user;
    this.district = props.district ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt ?? null;
  }
}