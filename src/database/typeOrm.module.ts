import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.getOrThrow('DB_HOST'),
                port: configService.getOrThrow('DB_PORT'),
                username: configService.getOrThrow('DB_USERNAME'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_NAME'),
                entities: [join(__dirname, '..', '**', '*.orm-entity.{js,ts}')],
                synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
                logging: configService.getOrThrow('DB_LOGGING') === 'true',
                migrationsTableName: 'migrations',
            }),
        })
    ],
})
export class TypeOrmRepositoryModule { }