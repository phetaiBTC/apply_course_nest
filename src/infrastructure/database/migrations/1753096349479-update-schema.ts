import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1753096349479 implements MigrationInterface {
    name = 'UpdateSchema1753096349479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`province\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`district\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`provinceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_educations\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`level\` varchar(255) NOT NULL, \`field_of_study\` varchar(255) NOT NULL, \`current_occupation\` varchar(255) NOT NULL, \`work_experience\` int NULL, \`status\` enum ('studying', 'graduated') NOT NULL DEFAULT 'graduated', \`studentIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teacher\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`specialization\` varchar(255) NOT NULL, \`experience\` int NOT NULL, \`education\` varchar(255) NOT NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`REL_4f596730e16ee49d9b081b5d8e\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course_categories\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`max_student\` int NOT NULL, \`duration_hours\` int NOT NULL, \`price\` int NOT NULL, \`registration_start_date\` datetime NOT NULL, \`registration_end_date\` datetime NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`description\` varchar(255) NULL, \`status\` enum ('open', 'closed', 'cancelled') NOT NULL DEFAULT 'open', \`teacherId\` int NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course_completion_records\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`total_score\` int NOT NULL, \`is_certified\` tinyint NOT NULL, \`status\` enum ('passed', 'failed', 'incompleted', 'withdrawn') NOT NULL DEFAULT 'passed', \`completion_date\` datetime NOT NULL, \`certificate_issued_date\` datetime NOT NULL, \`total_study_hours\` int NOT NULL, \`applyCourseId\` int NULL, \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`apply_courses\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`reason\` varchar(255) NOT NULL, \`status\` enum ('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending', \`studentId\` int NULL, \`courseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, \`birth_date\` datetime NULL, \`gender\` varchar(255) NULL, \`userId\` int NOT NULL, \`districtId\` int NULL, UNIQUE INDEX \`REL_b35463776b4a11a3df3c30d920\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`display_name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), UNIQUE INDEX \`IDX_1868fcc7e7d78014005703c5b7\` (\`display_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`display_name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), UNIQUE INDEX \`IDX_498e566f23124e519c0d40609b\` (\`display_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`is_verified\` tinyint NULL DEFAULT 0, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions\` (\`rolesId\` int NOT NULL, \`permissionsId\` int NOT NULL, INDEX \`IDX_0cb93c5877d37e954e2aa59e52\` (\`rolesId\`), INDEX \`IDX_d422dabc78ff74a8dab6583da0\` (\`permissionsId\`), PRIMARY KEY (\`rolesId\`, \`permissionsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles\` (\`usersId\` int NOT NULL, \`rolesId\` int NOT NULL, INDEX \`IDX_99b019339f52c63ae615358738\` (\`usersId\`), INDEX \`IDX_13380e7efec83468d73fc37938\` (\`rolesId\`), PRIMARY KEY (\`usersId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_permissions\` (\`usersId\` int NOT NULL, \`permissionsId\` int NOT NULL, INDEX \`IDX_440db3d6dd15ea8bfb0af41703\` (\`usersId\`), INDEX \`IDX_d68e45e4cd82c8fa4730e30cac\` (\`permissionsId\`), PRIMARY KEY (\`usersId\`, \`permissionsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`district\` ADD CONSTRAINT \`FK_23a21b38208367a242b1dd3a424\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_educations\` ADD CONSTRAINT \`FK_89edd422eb05f507692bdadade3\` FOREIGN KEY (\`studentIdId\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`teacher\` ADD CONSTRAINT \`FK_4f596730e16ee49d9b081b5d8e5\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_f921bd9bb6d061b90d386fa3721\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_c730473dfb837b3e62057cd9447\` FOREIGN KEY (\`categoryId\`) REFERENCES \`course_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`course_completion_records\` ADD CONSTRAINT \`FK_6b66c220321f1de30e3ec601066\` FOREIGN KEY (\`applyCourseId\`) REFERENCES \`apply_courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`course_completion_records\` ADD CONSTRAINT \`FK_87afb49cfdb290d50647e73ac96\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`apply_courses\` ADD CONSTRAINT \`FK_64d671f27c37a41ed2fe5c3deb3\` FOREIGN KEY (\`studentId\`) REFERENCES \`student\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`apply_courses\` ADD CONSTRAINT \`FK_6db420bc3b217e768410962b8e3\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_b35463776b4a11a3df3c30d920a\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_d0b389a82cc35e961a123e025e1\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_0cb93c5877d37e954e2aa59e52c\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_d422dabc78ff74a8dab6583da02\` FOREIGN KEY (\`permissionsId\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_99b019339f52c63ae6153587380\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_13380e7efec83468d73fc37938e\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_permissions\` ADD CONSTRAINT \`FK_440db3d6dd15ea8bfb0af417033\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_permissions\` ADD CONSTRAINT \`FK_d68e45e4cd82c8fa4730e30cacd\` FOREIGN KEY (\`permissionsId\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_permissions\` DROP FOREIGN KEY \`FK_d68e45e4cd82c8fa4730e30cacd\``);
        await queryRunner.query(`ALTER TABLE \`user_permissions\` DROP FOREIGN KEY \`FK_440db3d6dd15ea8bfb0af417033\``);
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_13380e7efec83468d73fc37938e\``);
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_99b019339f52c63ae6153587380\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_d422dabc78ff74a8dab6583da02\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_0cb93c5877d37e954e2aa59e52c\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_d0b389a82cc35e961a123e025e1\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_b35463776b4a11a3df3c30d920a\``);
        await queryRunner.query(`ALTER TABLE \`apply_courses\` DROP FOREIGN KEY \`FK_6db420bc3b217e768410962b8e3\``);
        await queryRunner.query(`ALTER TABLE \`apply_courses\` DROP FOREIGN KEY \`FK_64d671f27c37a41ed2fe5c3deb3\``);
        await queryRunner.query(`ALTER TABLE \`course_completion_records\` DROP FOREIGN KEY \`FK_87afb49cfdb290d50647e73ac96\``);
        await queryRunner.query(`ALTER TABLE \`course_completion_records\` DROP FOREIGN KEY \`FK_6b66c220321f1de30e3ec601066\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_c730473dfb837b3e62057cd9447\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_f921bd9bb6d061b90d386fa3721\``);
        await queryRunner.query(`ALTER TABLE \`teacher\` DROP FOREIGN KEY \`FK_4f596730e16ee49d9b081b5d8e5\``);
        await queryRunner.query(`ALTER TABLE \`student_educations\` DROP FOREIGN KEY \`FK_89edd422eb05f507692bdadade3\``);
        await queryRunner.query(`ALTER TABLE \`district\` DROP FOREIGN KEY \`FK_23a21b38208367a242b1dd3a424\``);
        await queryRunner.query(`DROP INDEX \`IDX_d68e45e4cd82c8fa4730e30cac\` ON \`user_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_440db3d6dd15ea8bfb0af41703\` ON \`user_permissions\``);
        await queryRunner.query(`DROP TABLE \`user_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_13380e7efec83468d73fc37938\` ON \`user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_99b019339f52c63ae615358738\` ON \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_d422dabc78ff74a8dab6583da0\` ON \`role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_0cb93c5877d37e954e2aa59e52\` ON \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_498e566f23124e519c0d40609b\` ON \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_1868fcc7e7d78014005703c5b7\` ON \`permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP INDEX \`REL_b35463776b4a11a3df3c30d920\` ON \`student\``);
        await queryRunner.query(`DROP TABLE \`student\``);
        await queryRunner.query(`DROP TABLE \`apply_courses\``);
        await queryRunner.query(`DROP TABLE \`course_completion_records\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP TABLE \`course_categories\``);
        await queryRunner.query(`DROP INDEX \`REL_4f596730e16ee49d9b081b5d8e\` ON \`teacher\``);
        await queryRunner.query(`DROP TABLE \`teacher\``);
        await queryRunner.query(`DROP TABLE \`student_educations\``);
        await queryRunner.query(`DROP TABLE \`district\``);
        await queryRunner.query(`DROP TABLE \`province\``);
    }

}
