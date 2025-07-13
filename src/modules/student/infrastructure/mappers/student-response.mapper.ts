import { formatTimeUtil } from "src/shared/utils/formatTime.util";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";
import { Student } from "../../domain/student.entity";
export interface IStudentResponse {
    id: number | null;
    email: string;
    name: string;
    surname: string;
    birth_date: string | null;
    gender: string | null;
    districtId: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;

}
export class StudentResponseMapper {
    static toResponse(student: Student): IStudentResponse {
        return {
            id: student.data.id!,
            email: student.data.email,
            name: student.data.name,
            surname: student.data.surname,
            birth_date: student.data.birth_date ? formatTimeUtil(student.data.birth_date) : null,
            gender: student.data.gender ? student.data.gender : null,
            districtId: student.data.districtId ? student.data.districtId : null,
            createdAt: student.data.createdAt ? formatTimeUtil(student.data.createdAt) : null,
            updatedAt: student.data.updatedAt ? formatTimeUtil(student.data.updatedAt) : null,
            deletedAt: student.data.deletedAt ? formatTimeUtil(student.data.deletedAt) : null,
        };
    }

    static toResponses(users: Student[], count?: number): IpaginationQuery<IStudentResponse[]> {
        return {
            data: users.map(user => this.toResponse(user)),
            count: count || users.length
        }
    }
}
