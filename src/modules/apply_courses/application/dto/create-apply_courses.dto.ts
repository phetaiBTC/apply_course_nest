import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApplyCourseStatus } from "src/infrastructure/typeorm/apply_courses.orm-entity";

export class CreateApplyCoursesDto {
    @IsNumber()
    @IsNotEmpty()
    student: number;
    
    @IsNumber()
    @IsNotEmpty()
    course: number;

    @IsNumber()
    @IsOptional()
    price?: number

    @IsEnum(ApplyCourseStatus)
    @IsNotEmpty()
    status: ApplyCourseStatus = ApplyCourseStatus.PENDING

    @IsString()
    @IsOptional()
    reason?: string
}