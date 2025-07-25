import { Controller, Get, Query, Param, Patch, Delete, Post, Body } from "@nestjs/common";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { CreateEducationDto } from "../application/dto/create-student_education.dto";
import { CreateEducationUseCase } from "../application/use-cases/command/create-student_education.use-case";

@Controller('education')
export class StudentEducationController {
    constructor(
        private readonly createEducationUseCase: CreateEducationUseCase
    ) { }
    @Get()
    getAll(@Query() query: PaginationDto) {

    }
    @Post()
    create(@Body() dto: CreateEducationDto) {
        return this.createEducationUseCase.execute(dto)
    }
}