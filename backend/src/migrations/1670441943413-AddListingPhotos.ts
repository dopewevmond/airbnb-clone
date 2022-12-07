import { MigrationInterface, QueryRunner } from "typeorm";

export class AddListingPhotos1670441943413 implements MigrationInterface {
    name = 'AddListingPhotos1670441943413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "listing_photos" (
                "id" SERIAL NOT NULL,
                "listingId" integer,
                "photoId" integer,
                CONSTRAINT "REL_46838d47a36a47b894a572bdb7" UNIQUE ("photoId"),
                CONSTRAINT "PK_73c5fd7f964a698b78f0920917c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos" DROP CONSTRAINT "FK_521c347c659860127baa75f30ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos"
            ADD CONSTRAINT "UQ_521c347c659860127baa75f30ab" UNIQUE ("roomId")
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos"
            ADD CONSTRAINT "FK_521c347c659860127baa75f30ab" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_photos"
            ADD CONSTRAINT "FK_fbe5bfb140ed07ab1bc04bd92c5" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_photos"
            ADD CONSTRAINT "FK_46838d47a36a47b894a572bdb7d" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "listing_photos" DROP CONSTRAINT "FK_46838d47a36a47b894a572bdb7d"
        `);
        await queryRunner.query(`
            ALTER TABLE "listing_photos" DROP CONSTRAINT "FK_fbe5bfb140ed07ab1bc04bd92c5"
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos" DROP CONSTRAINT "FK_521c347c659860127baa75f30ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos" DROP CONSTRAINT "UQ_521c347c659860127baa75f30ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos"
            ADD CONSTRAINT "FK_521c347c659860127baa75f30ab" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            DROP TABLE "listing_photos"
        `);
    }

}
