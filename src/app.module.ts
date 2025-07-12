import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmRepositoryModule } from './database/typeOrm.module';
import { StudentModule } from './modules/students/student.module';
import { TeachersModule } from './modules/teachers/teachers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmRepositoryModule,
    UserModule,
    StudentModule,
    TeachersModule
  ],
})
export class AppModule { }
