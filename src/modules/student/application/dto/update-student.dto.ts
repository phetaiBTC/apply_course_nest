import { IsString, IsOptional, IsNumber, IsDate, IsEnum } from "class-validator";
import { Gender } from "src/infrastructure/typeorm/student.orm-entity";
export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    name?: string;
    @IsString()
    @IsOptional()
    surname?: string;
    @IsNumber()
    @IsOptional()
    districtId?: number;
    @IsDate()
    @IsOptional()
    birth_date?: Date;
    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;
}