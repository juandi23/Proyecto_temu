// src/migration/1721579417666-firs.ts

import { MigrationInterface, QueryRunner } from "typeorm";

export class Firs1721579417666 implements MigrationInterface {
    name = 'Firs1721579417666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear la tabla `user` con el nuevo campo `verified`
        await queryRunner.query(`CREATE TABLE \`user\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            \`password\` varchar(255) NOT NULL,
            \`isActive\` tinyint NOT NULL DEFAULT 1,
            \`verified\` tinyint NOT NULL DEFAULT 0, -- Campo verificado
            \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);

        // Crear la tabla `task`
        await queryRunner.query(`CREATE TABLE \`task\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`title\` varchar(255) NOT NULL,
            \`description\` varchar(255) NULL,
            \`dueDate\` datetime NOT NULL,
            \`priority\` int NOT NULL,
            \`status\` varchar(255) NOT NULL,
            \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            \`userId\` int NULL,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);

        // Agregar la clave foránea para la tabla `task`
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_f316d3fe53497d4d8a2957db8b9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar la clave foránea
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_f316d3fe53497d4d8a2957db8b9\``);
        // Eliminar la tabla `user`
        await queryRunner.query(`DROP TABLE \`user\``);
        // Eliminar la tabla `task`
        await queryRunner.query(`DROP TABLE \`task\``);
    }
}
