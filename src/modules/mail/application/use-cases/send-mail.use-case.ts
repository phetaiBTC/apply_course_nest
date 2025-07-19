import { Inject, Injectable } from "@nestjs/common";
import { MailRepository } from "../../domain/mail.repository";

@Injectable()
export class SendMailUseCase {
    constructor(
        @Inject('MailRepository')
        private readonly mailRepository: MailRepository
    ) {}

    async execute(to: string, subject: string, text: string, html: string) {
        await this.mailRepository.sendMail(to, subject, text, html);
    }
}
