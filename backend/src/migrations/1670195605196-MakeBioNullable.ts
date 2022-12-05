import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeBioNullable1670195605196 implements MigrationInterface {
    name = 'MakeBioNullable1670195605196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "bio" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "bio"
            SET NOT NULL
        `);
    }

}
