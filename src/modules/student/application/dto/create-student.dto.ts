import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { DistrictEntity } from "src/infrastructure/typeorm/district.orm-entity";
import { Gender } from "src/infrastructure/typeorm/teacher.orm-entity";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0
    })
    @IsNotEmpty()
    password: string;

    @IsDate()
    @IsOptional()
    birth_date?: Date

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender

    @IsNumber()
    @IsOptional()
    district?: number
}