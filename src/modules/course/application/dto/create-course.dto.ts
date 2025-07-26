import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CourseStatus } from "src/infrastructure/typeorm/courses.orm-entity";

export class CreateCourseDto{
    @IsNumber()
    @IsNotEmpty()
    teacher:number

    @IsNumber()
    @IsNotEmpty()
    category:number

    @IsString()
    @IsNotEmpty()
    title:string

    @IsNumber()
    @IsNotEmpty()
    price:number

    @IsNumber()
    @IsNotEmpty()
    max_student:number

    @IsDate()
    @IsNotEmpty()
    start_date:Date

    @IsDate()
    @IsNotEmpty()
    end_date:Date

    @IsDate()
    @IsNotEmpty()
    registration_start_date:Date

    @IsDate()
    @IsNotEmpty()
    registration_end_date:Date

    @IsString()
    @IsOptional()
    description?:string

    @IsEnum(CourseStatus)
    @IsNotEmpty()
    status:CourseStatus = CourseStatus.OPEN

    @IsNumber()
    @IsNotEmpty()
    duration_hours:number
}