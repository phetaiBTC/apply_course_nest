import { CourseCategoryProps } from "../interface/course_category.interface";

export class CourseCategory {
    public id?: number;
    public name: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date | null;

    constructor(props: CourseCategoryProps) {
        this.id = props.id;
        this.name = props.name;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt ?? null;
    }
}