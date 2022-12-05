import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordHash1670193181670 implements MigrationInterface {
    name = 'AddPasswordHash1670193181670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password_hash" character varying(100) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password_hash"
        `);
    }

}
