import { SelectQueryBuilder } from "typeorm";
import { GetType, sortType } from "../dto/paginationDto";
import { PaginatedResponse } from "../interface/pagination-response";


export async function fetchWithPagination<
    T extends object,
    U,
>(query: {
    qb: SelectQueryBuilder<T>,
    sort?: sortType,
    search?: { kw?: string, field: string },
    page: number,
    limit: number,
    type?: GetType,
    toDomain: (entity: T) => U
}): Promise<PaginatedResponse<U>> {
    if (query.search && query.search.kw) {
        query.qb.where(
            `${query.qb.alias+"."+query.search.field} LIKE :kw`,
            { kw: `%${query.search.kw}%` },
        );
    }

    query.qb.orderBy(`${query.qb.alias}.createdAt`, query.sort || sortType.ASC);
    if (query.type === GetType.PAGE) {
        const [entities, total] = await query.qb.getManyAndCount();
        return {
            data: entities.map(query.toDomain),
            pagination: {
                total,
                count: entities.length,
                limit: query.limit,
                totalPages: Math.ceil(total / query.limit) || 1,
                currentPage: query.page,
            },
        };
    }
    if (query.type === GetType.ALL) {
        const [entities, total] = await query.qb.getManyAndCount();
        return {
            data: entities.map(query.toDomain),
            pagination: {
                total,
                count: entities.length,
                limit: 0,
                totalPages: 1,
                currentPage: 1,
            },
        };
    }

    const skip = (query.page - 1) * query.limit;
    const [entities, total] = await query.qb.skip(skip).take(query.limit).getManyAndCount();

    return {
        data: entities.map(query.toDomain),
        pagination: {
            total,
            count: entities.length,
            limit: query.limit,
            totalPages: Math.ceil(total / query.limit) || 1,
            currentPage: query.page,
        },
    };
}

