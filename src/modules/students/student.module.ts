import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "src/infrastructure/typeorm/student.orm-entity";
import { StucentController } from "./interfaces/student.controller";

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity])],
    controllers: [StucentController],
    providers: [],
})
export class StudentModule {}
