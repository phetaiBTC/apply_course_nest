import { PartialType } from "@nestjs/mapped-types";
import { CreateEducationDto } from "./create-student_education.dto";

export class UpdateEducationDto extends PartialType(CreateEducationDto) { }