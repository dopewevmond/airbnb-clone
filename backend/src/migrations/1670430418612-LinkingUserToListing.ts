import { MigrationInterface, QueryRunner } from "typeorm";

export class LinkingUserToListing1670430418612 implements MigrationInterface {
    name = 'LinkingUserToListing1670430418612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "listings"
            ADD "ownerId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "listings"
            ADD CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "listings" DROP CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9"
        `);
        await queryRunner.query(`
            ALTER TABLE "listings" DROP COLUMN "ownerId"
        `);
    }

}
