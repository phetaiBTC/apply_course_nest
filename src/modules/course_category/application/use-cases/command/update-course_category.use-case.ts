import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CourseCategory } from "src/modules/course_category/domain/course_category";
import { CourseCategoryRepository } from "src/modules/course_category/domain/course_category.repository";
import { CourseCategoryDto } from "../../dto/create-course_category.dto";

@Injectable()
export class UpdateCourseCategoryUseCase {
    constructor(
        @Inject('CourseCategoryRepository') private readonly courseCategoryRepository: CourseCategoryRepository
    ) { }

    async execute(id: number, dto: CourseCategoryDto): Promise<CourseCategory> {
        const category = await this.courseCategoryRepository.findOne(id);
        if (!category) throw new BadRequestException('Category not found');
        const nameExists = await this.courseCategoryRepository.findByName(dto.name);
        if (nameExists) throw new BadRequestException('Category name already exists');
        const categoryDomain = new CourseCategory({ name: dto.name });
        return this.courseCategoryRepository.update(id, categoryDomain);
    }
}