import { Module } from '@nestjs/common';
import { MailRepositoryImpl } from './infrastructure/mail.repository.impl';
import { SendMailUseCase } from './application/use-cases/send-mail.use-case';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASS'),
          },
        },
        defaults: {
          from: '"Your App Name" <phetaidev@gmail.com>',
        },
      }),
    })
  ],
  providers: [
    SendMailUseCase,
    {
      provide: 'MailRepository',
      useClass: MailRepositoryImpl
    }
  ],
  exports: [SendMailUseCase],
})
export class MailModule { }
