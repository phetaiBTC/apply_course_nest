import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1752840183245 implements MigrationInterface {
    name = 'UpdateSchema1752840183245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`is_verified\` \`is_verified\` tinyint NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`is_verified\` \`is_verified\` tinyint NULL`);
    }

}
