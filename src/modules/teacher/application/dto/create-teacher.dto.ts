import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateTeacherDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    surname: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0
    })
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    specialization: string

    @IsNumber()
    @IsNotEmpty()
    experience: number

    @IsString()
    @IsNotEmpty()
    education: string
}