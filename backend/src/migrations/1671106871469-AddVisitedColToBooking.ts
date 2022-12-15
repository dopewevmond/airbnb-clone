import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVisitedColToBooking1671106871469 implements MigrationInterface {
    name = 'AddVisitedColToBooking1671106871469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookings"
            ADD "visited_listing" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "bookings"
            ALTER COLUMN "paid_for"
            SET DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookings"
            ALTER COLUMN "paid_for" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "bookings" DROP COLUMN "visited_listing"
        `);
    }

}
