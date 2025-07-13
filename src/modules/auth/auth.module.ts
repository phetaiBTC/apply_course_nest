import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./interfaces/auth.controller";
import { LoginUseCase } from "./application/use-cases/query/login.use-case";
import { AuthRepositoryImpl } from "./infrastructure/auth.repository.impl";

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
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        LoginUseCase,
        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryImpl
        }
    ],
    exports: []
})
export class AuthModule { }