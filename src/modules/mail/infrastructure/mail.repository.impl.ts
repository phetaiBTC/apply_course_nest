import { Injectable } from "@nestjs/common";
import { MailRepository } from "../domain/mail.repository";
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailRepositoryImpl implements MailRepository {
    constructor(private readonly mailerService: MailerService) {}
    async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
        await this.mailerService.sendMail({
            to,
            subject,
            text,
            html,
        });
    }
}