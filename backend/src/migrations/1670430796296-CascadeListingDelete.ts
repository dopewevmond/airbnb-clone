import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeListingDelete1670430796296 implements MigrationInterface {
    name = 'CascadeListingDelete1670430796296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "amenities" DROP CONSTRAINT "FK_40891a0a7a0930cd1be5a28564d"
        `);
        await queryRunner.query(`
            ALTER TABLE "amenities"
            ADD CONSTRAINT "FK_40891a0a7a0930cd1be5a28564d" FOREIGN KEY ("ownedById") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "amenities" DROP CONSTRAINT "FK_40891a0a7a0930cd1be5a28564d"
        `);
        await queryRunner.query(`
            ALTER TABLE "amenities"
            ADD CONSTRAINT "FK_40891a0a7a0930cd1be5a28564d" FOREIGN KEY ("ownedById") REFERENCES "listings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
