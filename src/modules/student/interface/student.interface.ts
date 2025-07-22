import { Gender } from "src/infrastructure/typeorm/student.orm-entity";


export interface StudentResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  birth_date: string | null;
  gender: Gender | null;
  district: string | null;
  distinct_en: string | null;
  province: string | null;
  province_en: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
