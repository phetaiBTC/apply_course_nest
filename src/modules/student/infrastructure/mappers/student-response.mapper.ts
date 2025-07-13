import { formatTimeUtil } from "src/shared/utils/formatTime.util";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";
import { Student } from "../../domain/student.entity";
export class StudentResponseMapper {
    static toResponse(student:Student) {
        return {
            id: student.data.id,
            email: student.data.email,
            name: student.data.name,
            surname: student.data.surname,
            password: student.data.password,
            createdAt: student.data.createdAt ? formatTimeUtil(student.data.createdAt) : null,
            updatedAt: student.data.updatedAt ? formatTimeUtil(student.data.updatedAt) : null,
            deletedAt: student.data.deletedAt ? formatTimeUtil(student.data.deletedAt) : null,
        };
    }

    static toResponses(users: Student[],count?:number):IpaginationQuery<StudentResponseMapper[]> {
        return {
            data: users.map(user => this.toResponse(user)),
            count: count || users.length
        }
    }
}
