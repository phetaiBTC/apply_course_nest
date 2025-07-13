import { formatTimeUtil } from "src/shared/utils/formatTime.util";
import { User } from "../../domain/user.entity";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";
export class UserResponseMapper {
    static toResponse(user: User) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt ? formatTimeUtil(user.createdAt) : null,
            updatedAt: user.updatedAt ? formatTimeUtil(user.updatedAt) : null,
            deletedAt: user.deletedAt ? formatTimeUtil(user.deletedAt) : null,
        };
    }

    static toResponses(users: User[],count?:number):IpaginationQuery<UserResponseMapper[]> {
        return {
            data: users.map(user => this.toResponse(user)),
            count: count || users.length
        }
    }
}
