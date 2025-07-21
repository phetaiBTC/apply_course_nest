import { IsOptional, IsNumber, Min, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
export enum GetType {
    ALL = 'all',
    PAGE = 'page'
}
export enum sortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(GetType)
    type: GetType = GetType.PAGE;

    @IsOptional()
    @IsEnum(sortType)
    sort?: sortType = sortType.ASC;

}
