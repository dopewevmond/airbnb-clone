import { MigrationInterface, QueryRunner } from "typeorm";

export class LongerListingDescription1670534356466 implements MigrationInterface {
    name = 'LongerListingDescription1670534356466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "listings" ALTER COLUMN "description" TYPE varchar(500)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "listings" ALTER COLUMN "description" TYPE varchar(100)
        `);
    }

}
