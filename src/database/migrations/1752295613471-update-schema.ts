import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1752295613471 implements MigrationInterface {
    name = 'UpdateSchema1752295613471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`student_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, \`birth_date\` datetime NOT NULL, \`gender\` varchar(255) NOT NULL, \`districtId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_educations\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`provinceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`student_entity\` ADD CONSTRAINT \`FK_503a2222138ecf6a6a37bad3848\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_educations\` ADD CONSTRAINT \`FK_922dcf2b63b7be38ebdb23b91ad\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_educations\` DROP FOREIGN KEY \`FK_922dcf2b63b7be38ebdb23b91ad\``);
        await queryRunner.query(`ALTER TABLE \`student_entity\` DROP FOREIGN KEY \`FK_503a2222138ecf6a6a37bad3848\``);
        await queryRunner.query(`DROP TABLE \`student_educations\``);
        await queryRunner.query(`DROP TABLE \`student_entity\``);
    }

}
