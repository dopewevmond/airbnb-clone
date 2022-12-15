import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHostReview1671108029448 implements MigrationInterface {
    name = 'AddHostReview1671108029448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "host_reviews" (
                "id" SERIAL NOT NULL,
                "comment" character varying(255) NOT NULL,
                "reply" character varying(255),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "hostId" integer,
                "visitorId" integer,
                CONSTRAINT "PK_534511ff446ac180479222d561b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "host_reviews"
            ADD CONSTRAINT "FK_c774b8f5b511addb3d4bcee7788" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "host_reviews"
            ADD CONSTRAINT "FK_81888a754e89d94fc62a8521634" FOREIGN KEY ("visitorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "host_reviews" DROP CONSTRAINT "FK_81888a754e89d94fc62a8521634"
        `);
        await queryRunner.query(`
            ALTER TABLE "host_reviews" DROP CONSTRAINT "FK_c774b8f5b511addb3d4bcee7788"
        `);
        await queryRunner.query(`
            DROP TABLE "host_reviews"
        `);
    }

}
