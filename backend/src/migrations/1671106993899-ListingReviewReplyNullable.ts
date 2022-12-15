import { MigrationInterface, QueryRunner } from "typeorm";

export class ListingReviewReplyNullable1671106993899 implements MigrationInterface {
    name = 'ListingReviewReplyNullable1671106993899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "listing_reviews"
            ALTER COLUMN "reply" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "listing_reviews"
            ALTER COLUMN "reply"
            SET NOT NULL
        `);
    }

}
