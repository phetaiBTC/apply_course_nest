import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./interfaces/auth.controller";
import { LoginUseCase } from "./application/use-cases/query/login.use-case";
import { AuthRepositoryImpl } from "./infrastructure/auth.repository.impl";
import { verify } from "crypto";
import { VerifyEmailUseCase } from "./application/use-cases/command/verify-email.use-case";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";

@Module({
    imports: [
        UserModule,
        ConfigModule,
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow('JWT_SECRET'),
                signOptions: { expiresIn: configService.getOrThrow('JWT_EXPIRATION') },
            }),
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        VerifyEmailUseCase,
        LoginUseCase,
        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryImpl
        }
    ],
    exports: [
        JwtModule
    ]
})
export class AuthModule { }