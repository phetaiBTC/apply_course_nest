

import { Student } from "./student.entity";
export interface StudentRepository {
    create(student: Student): Promise<Student>;
}