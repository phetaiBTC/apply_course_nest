import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmRepositoryModule } from './database/typeOrm.module';
import { APP_GUARD } from '@nestjs/core';
import { TransactionModule } from './infrastructure/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmRepositoryModule,
    TransactionModule,
  ],
  providers: [],
})
export class AppModule { }
