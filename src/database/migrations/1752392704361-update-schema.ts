import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1752392704361 implements MigrationInterface {
    name = 'UpdateSchema1752392704361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD UNIQUE INDEX \`IDX_b35463776b4a11a3df3c30d920\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`student\` CHANGE \`birth_date\` \`birth_date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` CHANGE \`gender\` \`gender\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b35463776b4a11a3df3c30d920\` ON \`student\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_b35463776b4a11a3df3c30d920a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_b35463776b4a11a3df3c30d920a\``);
        await queryRunner.query(`DROP INDEX \`REL_b35463776b4a11a3df3c30d920\` ON \`student\``);
        await queryRunner.query(`ALTER TABLE \`student\` CHANGE \`gender\` \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` CHANGE \`birth_date\` \`birth_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` DROP INDEX \`IDX_b35463776b4a11a3df3c30d920\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`createdAt\``);
    }

}
