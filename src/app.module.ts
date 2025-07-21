import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmRepositoryModule } from './infrastructure/database/typeOrm.module';
import { APP_GUARD } from '@nestjs/core';
import { TransactionModule } from './infrastructure/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmRepositoryModule,
    TransactionModule,
    UserModule
  ],
  providers: [],
})
export class AppModule { }
