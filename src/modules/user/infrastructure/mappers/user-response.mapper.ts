import { formatTimeUtil } from "src/shared/utils/formatTime.util";
import { User } from "../../domain/user.entity";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";
export interface IUserResponse {
    id: number | null;
    email: string;
    name: string;
    surname: string;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
}
export class UserResponseMapper {
    static toResponse(user: User): IUserResponse {
        // console.log(user)
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            createdAt: user.createdAt ? formatTimeUtil(user.createdAt) : null,
            updatedAt: user.updatedAt ? formatTimeUtil(user.updatedAt) : null,
            deletedAt: user.deletedAt ? formatTimeUtil(user.deletedAt) : null,
        };
    }

    static toResponses(users: User[], count?: number): IpaginationQuery<IUserResponse[]> {
        return {
            data: users.map(this.toResponse),
            count: count || users.length
        }
    }
}
