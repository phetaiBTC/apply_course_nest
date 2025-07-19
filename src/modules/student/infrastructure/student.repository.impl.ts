
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { StudentRepository } from "../domain/student.repository";
import { Student } from "../domain/student.entity";
import { TRANSACTION_MANAGER_SERVICE } from "src/shared/constants/inject-key";
import { ITransactionManager } from "src/infrastructure/transaction/transaction.interface";
import { DataSource, Not, Repository } from "typeorm";
import { hashPassword } from "src/shared/utils/bcrypt.util";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { StudentMapper } from "./mappers/student.mapper";
import { SendMailUseCase } from "src/modules/mail/application/use-cases/send-mail.use-case";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationQueryDto } from "src/shared/dto/pagination-query.dto";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";
@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
    constructor(
        @Inject(TRANSACTION_MANAGER_SERVICE)
        private readonly transactionManagerService: ITransactionManager,
        private readonly dataSource: DataSource,
        private readonly sendMailUseCase: SendMailUseCase,
        private readonly jwtService: JwtService,

        @InjectRepository(StudentEntity)
        private readonly _studentRepo: Repository<StudentEntity>
    ) { }
    async create(student: Student): Promise<Student> {
        const queryRunner = await this.transactionManagerService.runInTransaction(
            this.dataSource,
            async (manager) => {
                const passwordHash = await hashPassword(student.data.password);
                const user = manager.create(UserEntity, {
                    name: student.data.name,
                    surname: student.data.surname,
                    email: student.data.email,
                    password: passwordHash,
                });
                const savedUser = await manager.save(user);
                const studentEntity = manager.create(StudentEntity, {
                    user: { id: savedUser.id },
                    surname: student.data.surname,
                    name: student.data.name,
                });
                const savedStudent = await manager.save(studentEntity);
                const token = this.jwtService.sign({ email: student.data.email });
                await this.sendMailUseCase.execute(student.data.email, "test", "test", `
                    <h1 style='color:red'>Hello world your token :</h1>
                    <a href='http://localhost:3000/auth/verify-email/${token}'>
                        <button style='color:red'>verify email</button>
                    </a>
                    `);
                return { savedStudent, savedUser };
            }
        );
        return StudentMapper.toDomain(queryRunner.savedStudent, queryRunner.savedUser);
    }
    async findById(id: number): Promise<Student | null> {
        const student = await this._studentRepo.findOne({ where: { id }, relations: { user: true } });
        return student ? StudentMapper.toDomain(student, student.user) : null;
    }

    async findAll(paginationQuery: PaginationQueryDto): Promise<IpaginationQuery<Student[]>> {
        const { limit = 10, offset = 1, search = '' } = paginationQuery;
        const skip = (offset - 1) * limit;
        const qb = this._studentRepo.createQueryBuilder('student')
            .leftJoinAndSelect('student.user', 'user')


        if (search) {
            qb.where('student.name LIKE :search OR student.email LIKE :search', { search: `%${search}%` });
        }
        const [students, count] = await qb
            .orderBy('student.createdAt', 'DESC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return {
            data: students.map((student) => StudentMapper.toDomain(student, student.user)),
            count,
        };

    }

    async delete(id: number): Promise<{ message: string }> {
        await this.transactionManagerService.runInTransaction(
            this.dataSource,
            async (manager) => {
                const student = await manager.findOne(StudentEntity, {
                    where: { id },
                    relations: ['user'],
                });

                if (!student) {
                    throw new NotFoundException(`Student with id ${id} not found`);
                }

                if (!student.user) {
                    throw new NotFoundException(`User for student ${id} not found`);
                }

                await manager.delete(StudentEntity, id);

                await manager.delete(UserEntity, student.user.id);
            }
        );
        return { message: 'done...!' };
    }



}
