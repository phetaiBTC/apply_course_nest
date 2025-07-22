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


@Injectable()
export class StudentRepositoryOrm implements StudentRepository {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        @Inject(TRANSACTION_MANAGER_SERVICE)
        private readonly transactionManagerService: ITransactionManager,
        @InjectRepository(StudentEntity) private readonly studentRepository: Repository<StudentEntity>
    ) { }

    async save(student: Student, user: User): Promise<Student> {
        try {
            const result = await this.transactionManagerService.runInTransaction(
                this.dataSource,
                async (manager) => {
                    const userEntity = UserMapper.toOrm(user);
                    const savedUser = await manager.getRepository(UserEntity).save(userEntity);
                    const studentEntity = StudentMapper.toOrm({
                        ...student,
                        user: UserMapper.toDomain(savedUser)
                    });
                    const savedStudent = manager.getRepository(StudentEntity).save(studentEntity);
                    const savedEntity = await savedStudent;
                    return StudentMapper.toDomain(savedEntity);
                },
            )
            return result
        } catch (e) {
            throw e
        }
    }
    async findOne(id: number): Promise<Student | null> {
        const student = await this.studentRepository.findOne({ where: { id: id }, relations: ['user', 'district', 'district.province'] });
        return student ? StudentMapper.toDomain(student) : null;
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<Student>> {
        const qb = this.studentRepository.createQueryBuilder('student');
        qb
            .leftJoinAndSelect('student.user', 'user')
            .leftJoinAndSelect('student.district', 'district')
            .leftJoinAndSelect('district.province', 'province');
        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'name'
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
                        user: UserMapper.toDomain(isStudentExists.user)}));
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
        await this.studentRepository.delete({ id: id });
        return { message: 'User deleted' };
    }

    async softDelete(id: number): Promise<{ message: string }> {
        await this.studentRepository.softDelete({ id: id });
        return { message: 'User deleted' };
    }

    async restore(id: number): Promise<{ message: string }> {
        const user = await this.studentRepository.findOne({ where: { id }, withDeleted: true });
        if (!user) throw new NotFoundException('User not found');
        await this.studentRepository.restore({ id: id });
        return { message: 'User restored' };
    }
}