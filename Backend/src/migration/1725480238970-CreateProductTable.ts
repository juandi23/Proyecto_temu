// src/migration/1621579417666-create-product-table.ts

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1621579417666 implements MigrationInterface {
    name = 'CreateProductTable1621579417666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear tabla de categorías
        await queryRunner.query(`CREATE TABLE \`category\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`description\` text NULL,
            \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);

        // Crear tabla de productos
        await queryRunner.query(`CREATE TABLE \`product\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`description\` text NULL,
            \`price\` decimal(10,2) NOT NULL,
            \`stock\` int NOT NULL,
            \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);

        // Crear tabla intermedia de relaciones productos-categorías
        await queryRunner.query(`CREATE TABLE \`product_category\` (
            \`productId\` int NOT NULL,
            \`categoryId\` int NOT NULL,
            PRIMARY KEY (\`productId\`, \`categoryId\`),
            FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE,
            FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE
        ) ENGINE=InnoDB`);

        // Crear tabla de imágenes de productos
        await queryRunner.query(`CREATE TABLE \`images_products\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`productId\` int NOT NULL,
            \`imageUrl\` varchar(255) NOT NULL,
            \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (\`id\`),
            FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE
        ) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar tablas en el orden inverso de creación para evitar errores de clave foránea
        await queryRunner.query(`DROP TABLE \`images_products\``);
        await queryRunner.query(`DROP TABLE \`product_category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }
}
