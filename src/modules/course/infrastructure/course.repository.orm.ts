import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoursesEntity } from "src/infrastructure/typeorm/courses.orm-entity";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { fetchWithPagination } from "src/shared/utils/pagination.builder";
import { LessThanOrEqual, MoreThanOrEqual, Not, Repository } from "typeorm";
import { CourseMapper } from "../mapper/course.mapper";
import { Course } from "../domain/course";
import { CourseRepository } from "../domain/course.repository";

@Injectable()
export class CourseRepositoryOrm implements CourseRepository {
    constructor(
        @InjectRepository(CoursesEntity)
        private readonly courseRepository: Repository<CoursesEntity>
    ) { }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<Course>> {
        const qb = this.courseRepository.createQueryBuilder('course')
            .withDeleted()
            .leftJoinAndSelect('course.teacher', 'teacher')
            .leftJoinAndSelect('teacher.user', 'user')
            .leftJoinAndSelect('course.category', 'category')
        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'course.title'
            },
            is_active: query.is_active,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            toDomain: CourseMapper.toDomain,
        })
    }
    async findCourseExist(course: Course, id?: number): Promise<Course[]> {
        const courseOrm = CourseMapper.toOrm(course);

        const baseConditions = [
            // กรณีที่ course ใหม่เริ่มในช่วงของ course เก่า
            {
                teacher: courseOrm.teacher,
                start_date: LessThanOrEqual(courseOrm.start_date),
                end_date: MoreThanOrEqual(courseOrm.start_date)
            },
            // กรณีที่ course ใหม่จบในช่วงของ course เก่า
            {
                teacher: courseOrm.teacher,
                start_date: LessThanOrEqual(courseOrm.end_date),
                end_date: MoreThanOrEqual(courseOrm.end_date)
            },
            // กรณีที่ course เก่าอยู่ในช่วงของ course ใหม่
            {
                teacher: courseOrm.teacher,
                start_date: MoreThanOrEqual(courseOrm.start_date),
                end_date: LessThanOrEqual(courseOrm.end_date)
            }
        ];

        // ถ้ามี id ให้เพิ่มเงื่อนไขไม่เอา course ที่มี id นี้
        const whereConditions = id
            ? baseConditions.map(condition => ({ ...condition, id: Not(id) }))
            : baseConditions;

        const courses = await this.courseRepository.find({
            relations: ['teacher', 'category', 'teacher.user'],
            where: whereConditions
        });

        // console.log(courses);
        return courses.map(course => CourseMapper.toDomain(course));
    }

    async save(course: Course): Promise<Course> {
        const courseOrm = CourseMapper.toOrm(course);
        return CourseMapper.toDomain(await this.courseRepository.save(courseOrm));
    }

    async findOne(id: number): Promise<Course | null> {
        const course = await this.courseRepository.findOne({
            relations: ['teacher', 'category', 'teacher.user'],
            where: { id }, withDeleted: true
        });
        return course ? CourseMapper.toDomain(course) : null;
    }

    async update(id: number, course: Course): Promise<Course> {
        const courseOrm = CourseMapper.toOrm(course);
        return CourseMapper.toDomain(await this.courseRepository.save({ ...courseOrm, id }));
    }

    async hardDelete(id: number): Promise<{ message: string }> {
        await this.courseRepository.delete(id);
        return { message: 'Course deleted' };
    }

    async softDelete(id: number): Promise<{ message: string }> {
        await this.courseRepository.softDelete(id);
        return { message: 'Course deleted' };
    }

    async restore(id: number): Promise<{ message: string }> {
        await this.courseRepository.restore(id);
        return { message: 'Course restored' };
    }
}