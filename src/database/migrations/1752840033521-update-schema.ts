import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1752840033521 implements MigrationInterface {
    name = 'UpdateSchema1752840033521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`is_verified\` tinyint NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_verified\``);
    }

}
