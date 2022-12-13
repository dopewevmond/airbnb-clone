import { MigrationInterface, QueryRunner } from "typeorm";

export class AutogeneratePrimaryKey1670931222488 implements MigrationInterface {
    name = 'AutogeneratePrimaryKey1670931222488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "amenities_id_seq" OWNED BY "amenities"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "amenities"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"amenities_id_seq"')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "amenities"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "amenities_id_seq"
        `);
    }

}
