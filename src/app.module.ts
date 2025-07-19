import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmRepositoryModule } from './database/typeOrm.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guard/jwt.guard';
import { StudentModule } from './modules/student/student.module';
import { TransactionModule } from './infrastructure/transaction/transaction.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmRepositoryModule,
    TransactionModule,
    UserModule,
    AuthModule,
    StudentModule,
    MailModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
