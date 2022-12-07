import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomsTable1670433873140 implements MigrationInterface {
    name = 'RoomsTable1670433873140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rooms" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "room_info" jsonb NOT NULL,
                "listingId" integer,
                CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "rooms"
            ADD CONSTRAINT "FK_93b4c485d8934b333364e32e3a1" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rooms" DROP CONSTRAINT "FK_93b4c485d8934b333364e32e3a1"
        `);
        await queryRunner.query(`
            DROP TABLE "rooms"
        `);
    }

}
