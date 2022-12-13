import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePrimaryKeyAmenity1670931012159 implements MigrationInterface {
    name = 'RemovePrimaryKeyAmenity1670931012159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "amenities"
                RENAME COLUMN "ownedbyId" TO "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "amenities"
                RENAME CONSTRAINT "PK_1ccdbf9a738ebe16386e65a5eed" TO "PK_c0777308847b3556086f2fb233e"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "amenities"
                RENAME CONSTRAINT "PK_c0777308847b3556086f2fb233e" TO "PK_1ccdbf9a738ebe16386e65a5eed"
        `);
        await queryRunner.query(`
            ALTER TABLE "amenities"
                RENAME COLUMN "id" TO "ownedbyId"
        `);
    }

}
