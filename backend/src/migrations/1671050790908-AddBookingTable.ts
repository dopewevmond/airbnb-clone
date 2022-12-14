import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookingTable1671050790908 implements MigrationInterface {
    name = 'AddBookingTable1671050790908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "listing_reviews" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "comment" character varying(255) NOT NULL,
                "reply" character varying(255) NOT NULL,
                "listingId" integer,
                "reviewerId" integer,
                CONSTRAINT "PK_d25da6f3ecb52801f7c1c438821" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "bookings" (
                "id" SERIAL NOT NULL,
                "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
                "end_date" TIMESTAMP WITH TIME ZONE NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "total_amount" integer NOT NULL,
                "paid_for" boolean NOT NULL,
                "ownerId" integer,
                "listingId" integer,
                CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_reviews"
            ADD CONSTRAINT "FK_4f50ca5f2d91c596ba6185e8342" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_reviews"
            ADD CONSTRAINT "FK_3193caa5273bb20c7bdb5ed9ff8" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "bookings"
            ADD CONSTRAINT "FK_85001d7223966f1b05d302d7807" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "bookings"
            ADD CONSTRAINT "FK_e763ea743df0d8799bc4f957832" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookings" DROP CONSTRAINT "FK_e763ea743df0d8799bc4f957832"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookings" DROP CONSTRAINT "FK_85001d7223966f1b05d302d7807"
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_reviews" DROP CONSTRAINT "FK_3193caa5273bb20c7bdb5ed9ff8"
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_reviews" DROP CONSTRAINT "FK_4f50ca5f2d91c596ba6185e8342"
        `);
        await queryRunner.query(`
            DROP TABLE "bookings"
        `);
        await queryRunner.query(`
            DROP TABLE "listing_reviews"
        `);
    }

}
