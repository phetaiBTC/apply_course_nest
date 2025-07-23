import { User } from "src/modules/user/domain/user"

export interface TeacherProps {
    id?: number
    specialization: string
    experience: number
    education: string
    user: User
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date | null
}

export class Teacher {
    public id?: number
    public specialization: string
    public experience: number
    public education: string
    public user: User
    public createdAt?: Date
    public updatedAt?: Date
    public deletedAt?: Date | null
    constructor(props: TeacherProps) {
        this.id = props.id;
        this.specialization = props.specialization;
        this.experience = props.experience;
        this.education = props.education;
        this.user = props.user;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt ?? null;
    }
}