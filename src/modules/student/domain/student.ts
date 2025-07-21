import { Gender } from "src/infrastructure/typeorm/teacher.orm-entity";// แยก enum ไว้ไฟล์อื่น
import { User } from 'src/modules/user/domain/user';

export interface StudentProps {
  id?: number;
  name: string;
  surname: string;
  birth_date?: Date;
  gender?: Gender;
  user: User;
  districtId?: number;
}

export class Student {
  public id?: number;
  public name: string;
  public surname: string;
  public birth_date?: Date;
  public gender?: Gender;
  public user: User;
  public districtId?: number;

  constructor(props: StudentProps) {
    this.id = props.id;
    this.name = props.name;
    this.surname = props.surname;
    this.birth_date = props.birth_date;
    this.gender = props.gender;
    this.user = props.user;
    this.districtId = props.districtId;
  }
}