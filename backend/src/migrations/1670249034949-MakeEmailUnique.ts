import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeEmailUnique1670249034949 implements MigrationInterface {
    name = 'MakeEmailUnique1670249034949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_d1a16364b1f276e14e8e4cfc47e" UNIQUE ("email_address")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_d1a16364b1f276e14e8e4cfc47e"
        `);
    }

}
