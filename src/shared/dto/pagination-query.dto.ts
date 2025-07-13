// src/common/dto/pagination-query.dto.ts
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';
export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    readonly limit?: number;

    @IsOptional()
    @Min(0)
    readonly offset?: number;

    @IsOptional()
    @IsString()
    readonly search?: string;
}
