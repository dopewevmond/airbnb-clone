import { MigrationInterface, QueryRunner } from "typeorm";

export class AddListingReview1671037563539 implements MigrationInterface {
    name = 'AddListingReview1671037563539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "listing_review" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "comment" character varying(255) NOT NULL,
                "reply" character varying(255) NOT NULL,
                "listingId" integer,
                "reviewerId" integer,
                CONSTRAINT "PK_a14317477262d157959ef56e5f1" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_review"
            ADD CONSTRAINT "FK_efe04ee146a90f826767a92bfb8" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_review"
            ADD CONSTRAINT "FK_19629d12d3c7806b44edc93e0ec" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "listing_review" DROP CONSTRAINT "FK_19629d12d3c7806b44edc93e0ec"
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_review" DROP CONSTRAINT "FK_efe04ee146a90f826767a92bfb8"
        `);
        await queryRunner.query(`
            DROP TABLE "listing_review"
        `);
    }

}
