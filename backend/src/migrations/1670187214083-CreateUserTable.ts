import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1670187214083 implements MigrationInterface {
    name = 'CreateUserTable1670187214083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_native_language_enum" AS ENUM('english', 'french', 'spanish')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."users_secondary_language_enum" AS ENUM('english', 'french', 'spanish')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "first_name" character varying(50) NOT NULL,
                "last_name" character varying(50) NOT NULL,
                "email_address" character varying(255) NOT NULL,
                "phone_number" character varying(12),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "native_language" "public"."users_native_language_enum" NOT NULL DEFAULT 'english',
                "secondary_language" "public"."users_secondary_language_enum",
                "bio" character varying(255) NOT NULL,
                "profile_photo" character varying(255),
                "has_verified_email" boolean NOT NULL DEFAULT false,
                "is_super_host" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_secondary_language_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_native_language_enum"
        `);
    }

}
