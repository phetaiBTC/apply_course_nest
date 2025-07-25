import { IsNotEmpty, IsString } from "class-validator";

export class CourseCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}