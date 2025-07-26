import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { TRANSACTION_MANAGER_SERVICE } from "src/shared/constants/inject-key";
import { ITransactionManager } from "src/infrastructure/transaction/transaction.interface";
import { TeacherEntity } from "src/infrastructure/typeorm/teacher.orm-entity";
import { SendMail } from "src/modules/mail/application/use-cases/sendMail";
import { Teacher } from "../domain/teacher";
import { User } from "src/modules/user/domain/user";
import { UserMapper } from "src/modules/user/mapper/user.mapper";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { TeacherMapper } from "../mapper/teacher.mapper";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { fetchWithPagination } from "src/shared/utils/pagination.builder";

@Injectable()
export class TeacherRepositoryOrm {
    constructor(
        private readonly jwtService: JwtService,
        @InjectDataSource() private readonly dataSource: DataSource,
        @Inject(TRANSACTION_MANAGER_SERVICE)
        private readonly transactionManagerService: ITransactionManager,
        @InjectRepository(TeacherEntity) private readonly teacherRepository: Repository<TeacherEntity>,
        // private readonly sendMail: SendMail
    ) { }
    async save(Teacher: Teacher, user: User): Promise<Teacher> {

        try {
            const result = await this.transactionManagerService.runInTransaction(
                this.dataSource,
                async (manager) => {
                    const userEntity = UserMapper.toOrm(user);
                    const savedUser = await manager.getRepository(UserEntity).save({
                        ...userEntity,
                        roles: [{ id: 3 }]
                    });
                    const teacherEntity = TeacherMapper.toOrm({
                        ...Teacher,
                        user: UserMapper.toDomain(savedUser)
                    });
                    // const token = await this.jwtService.signAsync({
                    //     email: user.email
                    // })
                    const savedTeacher = manager.getRepository(TeacherEntity).save(teacherEntity);
                    const savedEntity = await savedTeacher;
                    // await this.sendMail.execute(user.email, 'Bienvenido a la plataforma', 'Bienvenido a la plataforma',
                    //     `http://localhost:3000/verify/${token}`
                    // );
                    return TeacherMapper.toDomain(savedEntity);
                },
            )
            return result
        } catch (e) {
            throw e
        }
    }
    async findOne(id: number): Promise<Teacher | null> {
        const Teacher = await this.teacherRepository.findOne({ where: { id: id }, relations: ['user'] });
        return Teacher ? TeacherMapper.toDomain(Teacher) : null;
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<Teacher>> {
        const qb = this.teacherRepository.createQueryBuilder('teacher')
            .withDeleted()
            .leftJoinAndSelect('teacher.user', 'user')

        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'user.name'
            },
            is_active: query.is_active,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            toDomain: TeacherMapper.toDomain,
        });
    }

    async update(id: number, Teacher: Teacher, user: User): Promise<Teacher> {
        try {
            const result = await this.transactionManagerService.runInTransaction(
                this.dataSource,
                async (manager) => {
                    const isTeacherExists = await manager.getRepository(TeacherEntity).findOne({ where: { id: id }, relations: ['user'] });
                    if (!isTeacherExists) throw new NotFoundException('Teacher not found');
                    const userDomain = UserMapper.toDomain(isTeacherExists.user);
                    userDomain.name = user.name || userDomain.name;
                    userDomain.surname = user.surname || userDomain.surname;
                    await manager.getRepository(TeacherEntity).update({ id: id }, TeacherMapper.toOrm({
                        ...Teacher,
                        user: UserMapper.toDomain(isTeacherExists.user)
                    }));
                    await manager.getRepository(UserEntity).save(UserMapper.toOrm(userDomain));
                    const teacherEntity = await manager.getRepository(TeacherEntity).findOne({ where: { id: id }, relations: ['user'] });
                    return TeacherMapper.toDomain(teacherEntity!);
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
                    const isTeacherExists = await manager.getRepository(TeacherEntity).findOne({ where: { id: id }, relations: ['user'] , withDeleted: true});
                    if (!isTeacherExists) throw new NotFoundException('Teacher not found');
                    await manager.getRepository(TeacherEntity).delete({ id: id });
                    await manager.getRepository(UserEntity).delete({ id: isTeacherExists.user.id });
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
                    const isTeacherExists = await manager.getRepository(TeacherEntity).findOne({ where: { id: id }, relations: ['user'] });
                    if (!isTeacherExists) throw new NotFoundException('Teacher not found');
                    await manager.getRepository(TeacherEntity).softDelete({ id: id });
                    await manager.getRepository(UserEntity).softDelete({ id: isTeacherExists.user.id });
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
                    const isTeacherExists = await manager.getRepository(TeacherEntity).findOne({ where: { id: id }, withDeleted: true, relations: ['user'] });
                    if (!isTeacherExists) throw new NotFoundException('Teacher not found');
                    await manager.getRepository(TeacherEntity).restore({ id: id });
                    await manager.getRepository(UserEntity).restore({ id: isTeacherExists.user.id });
                    return { message: 'User restored' };
                },
            )
            return result
        } catch (e) {
            throw e
        }
    }
}