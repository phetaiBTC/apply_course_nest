import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/shared/constants/inject-key";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.secret },
        }),
    ],
    controllers: [],
    providers: [JwtStrategy],
    exports: []
})
export class AuthModule { }