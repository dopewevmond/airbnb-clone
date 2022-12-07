import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoomPhotos1670439514767 implements MigrationInterface {
    name = 'AddRoomPhotos1670439514767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "photos" (
                "id" SERIAL NOT NULL,
                "photo_service_id" character varying(255) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "photo_uri" character varying(255) NOT NULL,
                CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "room_photos" (
                "roomId" integer NOT NULL,
                "photoId" integer,
                CONSTRAINT "REL_521c347c659860127baa75f30a" UNIQUE ("roomId"),
                CONSTRAINT "REL_82c171e72b1b85c5de8779b250" UNIQUE ("photoId"),
                CONSTRAINT "PK_521c347c659860127baa75f30ab" PRIMARY KEY ("roomId")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos"
            ADD CONSTRAINT "FK_521c347c659860127baa75f30ab" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos"
            ADD CONSTRAINT "FK_82c171e72b1b85c5de8779b2501" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "room_photos" DROP CONSTRAINT "FK_82c171e72b1b85c5de8779b2501"
        `);
        await queryRunner.query(`
            ALTER TABLE "room_photos" DROP CONSTRAINT "FK_521c347c659860127baa75f30ab"
        `);
        await queryRunner.query(`
            DROP TABLE "room_photos"
        `);
        await queryRunner.query(`
            DROP TABLE "photos"
        `);
    }

}
