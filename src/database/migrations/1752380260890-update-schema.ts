import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1752380260890 implements MigrationInterface {
    name = 'UpdateSchema1752380260890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`student\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, \`birth_date\` datetime NOT NULL, \`gender\` varchar(255) NOT NULL, \`districtId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_d0b389a82cc35e961a123e025e1\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_d0b389a82cc35e961a123e025e1\``);
        await queryRunner.query(`DROP TABLE \`student\``);
    }

}
