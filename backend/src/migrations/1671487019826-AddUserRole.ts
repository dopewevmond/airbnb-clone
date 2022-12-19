import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1671487019826 implements MigrationInterface {
    name = 'AddUserRole1671487019826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_user_role_enum" AS ENUM('host', 'visitor')
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "user_role" "public"."users_user_role_enum" NOT NULL DEFAULT 'visitor'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "user_role"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_user_role_enum"
        `);
    }

}
