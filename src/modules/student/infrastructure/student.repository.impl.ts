
import { Inject, Injectable } from "@nestjs/common";
import { StudentRepository } from "../domain/student.repository";
import { Student } from "../domain/student.entity";
import { TRANSACTION_MANAGER_SERVICE } from "src/shared/constants/inject-key";
import { ITransactionManager } from "src/infrastructure/transaction/transaction.interface";
import { DataSource } from "typeorm";
import { hashPassword } from "src/shared/utils/bcrypt.util";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
    constructor(
        @Inject(TRANSACTION_MANAGER_SERVICE)
        private readonly transactionManagerService: ITransactionManager,
        private readonly dataSource: DataSource,
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
                return { savedStudent, savedUser };
            }
        );
        return new Student(
            {
                id: queryRunner.savedStudent.id,
                name: queryRunner.savedStudent.name,
                email: queryRunner.savedUser.email,
                surname: queryRunner.savedStudent.surname,
                password: queryRunner.savedUser.password,
                createdAt: queryRunner.savedStudent.createdAt,
                updatedAt: queryRunner.savedStudent.updatedAt,
            }
        );
    }
}
