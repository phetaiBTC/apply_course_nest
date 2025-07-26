import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CourseCompletionStatus } from "src/infrastructure/typeorm/course_completion_records.orm-entity";

export class CourseCompletionRecordsDto {
    @IsNumber()
    @IsNotEmpty()
    apply_courses: number;

    @IsNumber()
    @IsOptional()
    created_by?: number;

    @IsNumber()
    @IsNotEmpty()
    total_score: number;

    @IsBoolean()
    @IsNotEmpty()
    is_certified: boolean;

    @IsEnum(CourseCompletionStatus)
    @IsNotEmpty()
    status: CourseCompletionStatus = CourseCompletionStatus.PASSED;

    @IsDate()
    @IsNotEmpty()
    completion_date: Date;

    @IsDate()
    @IsNotEmpty()
    certificate_issued_date: Date;
    
    @IsNumber()
    @IsNotEmpty()
    total_study_hours: number
}