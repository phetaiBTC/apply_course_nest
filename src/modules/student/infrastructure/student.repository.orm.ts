import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { DataSource, Repository } from "typeorm";
import { Student } from "../domain/student";
import { ITransactionManager } from "src/infrastructure/transaction/transaction.interface";
import { StudentMapper } from "../mapper/student.mapper";
import { User } from "src/modules/user/domain/user";
import { UserMapper } from "src/modules/user/mapper/user.mapper";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { StudentRepository } from "../domain/student.repository";
import { TRANSACTION_MANAGER_SERVICE } from "src/shared/constants/inject-key";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { fetchWithPagination } from "src/shared/utils/pagination.builder";
import { SendMail } from "src/modules/mail/application/use-cases/sendMail";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class StudentRepositoryOrm implements StudentRepository {
    constructor(
        private readonly jwtService: JwtService,
        @InjectDataSource() private readonly dataSource: DataSource,
        @Inject(TRANSACTION_MANAGER_SERVICE)
        private readonly transactionManagerService: ITransactionManager,
        @InjectRepository(StudentEntity) private readonly studentRepository: Repository<StudentEntity>,
        private readonly sendMail: SendMail
    ) { }

    async save(student: Student, user: User): Promise<Student> {
        try {
            const result = await this.transactionManagerService.runInTransaction(
                this.dataSource,
                async (manager) => {
                    const userEntity = UserMapper.toOrm(user);
                    const savedUser = await manager.getRepository(UserEntity).save({
                        ...userEntity,
                        roles: [{ id: 2 }]
                    });
                    const studentEntity = StudentMapper.toOrm({
                        ...student,
                        user: UserMapper.toDomain(savedUser)
                    });
                    const token = await this.jwtService.signAsync({
                        email: user.email
                    })
                    const savedStudent = manager.getRepository(StudentEntity).save(studentEntity);
                    const savedEntity = await savedStudent;
                    await this.sendMail.execute(user.email, 'Bienvenido a la plataforma', 'Bienvenido a la plataforma',
                        `http://localhost:3000/verify/${token}`
                    );
                    return StudentMapper.toDomain(savedEntity);
                },
            )
            return result
        } catch (e) {
            throw e
        }
    }
    async findOne(id: number): Promise<Student | null> {
        const student = await this.studentRepository.findOne({ where: { id: id }, relations: ['user', 'district', 'district.province', 'educations', 'educations.student_id', 'educations.student_id.user'] });
        // console.log(student);
        return student ? StudentMapper.toDomain(student) : null;
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<Student>> {
        const qb = this.studentRepository.createQueryBuilder('student');
        qb
            .withDeleted()
            .leftJoinAndSelect('student.user', 'user')
            .leftJoinAndSelect('student.educations', 'educations')
            .leftJoinAndSelect('educations.student_id', 'student_id')
            .leftJoinAndSelect('student_id.user', 'user_id')
            .leftJoinAndSelect('student.district', 'district')
            .leftJoinAndSelect('district.province', 'province')
        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'student.name'
            },
            is_active: query.is_active,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            toDomain: StudentMapper.toDomain,
        });
    }

    async update(id: number, student: Student): Promise<Student> {
        try {
            const result = await this.transactionManagerService.runInTransaction(
                this.dataSource,
                async (manager) => {
                    const isStudentExists = await manager.getRepository(StudentEntity).findOne({ where: { id: id }, relations: ['user'] });
                    if (!isStudentExists) throw new NotFoundException('Student not found');
                    const userDomain = UserMapper.toDomain(isStudentExists.user);
                    userDomain.name = student.name || userDomain.name;
                    userDomain.surname = student.surname || userDomain.surname;
                    await manager.getRepository(StudentEntity).update({ id: id }, StudentMapper.toOrm({
                        ...student,
                        user: UserMapper.toDomain(isStudentExists.user)
                    }));
                    await manager.getRepository(UserEntity).save(UserMapper.toOrm(userDomain));
                    const studentEntity = await manager.getRepository(StudentEntity).findOne({ where: { id: id }, relations: ['user', 'district', 'district.province'] });
                    return StudentMapper.toDomain(studentEntity!);
                },
            )
            return result
        } catch (e) {
            throw e
        }
    }

    async hardDelete(id: number): Promise<{ message: string }> {
        try {
            const result = await this.transactionManagerService.runInTransaction(
                this.dataSource,
                async (manager) => {
                    const isStudentExists = await manager.getRepository(StudentEntity).findOne({ where: { id: id }, relations: ['user'], withDeleted: true });
                    if (!isStudentExists) throw new NotFoundException('Student not found');
                    await manager.getRepository(StudentEntity).delete({ id: id });
                    await manager.getRepository(UserEntity).delete({ id: isStudentExists.user.id });
                    return { message: 'User deleted' }
                },
            )
            return result
        } catch (e) {
            throw e
        }
    }

    async softDelete(id: number): Promise<{ message: string }> {
        try {
            const result = await this.transactionManagerService.runInTransaction(
                this.dataSource,
                async (manager) => {
                    const isStudentExists = await manager.getRepository(StudentEntity).findOne({ where: { id: id }, relations: ['user'] });
                    if (!isStudentExists) throw new NotFoundException('Student not found');
                    await manager.getRepository(StudentEntity).softDelete({ id: id });
                    await manager.getRepository(UserEntity).softDelete({ id: isStudentExists.user.id });
                    return { message: 'User deleted' }
                },
            )
            return result
        } catch (e) {
            throw e
        }
    }

    async restore(id: number): Promise<{ message: string }> {
        try {
            const result = await this.transactionManagerService.runInTransaction(
                this.dataSource,
                async (manager) => {
                    const isStudentExists = await manager.getRepository(StudentEntity).findOne({ where: { id: id }, withDeleted: true, relations: ['user'] });
                    if (!isStudentExists) throw new NotFoundException('Student not found');
                    await manager.getRepository(StudentEntity).restore({ id: id });
                    await manager.getRepository(UserEntity).restore({ id: isStudentExists.user.id });
                    return { message: 'User restored' };
                },
            )
            return result
        } catch (e) {
            throw e
        }
    }
}