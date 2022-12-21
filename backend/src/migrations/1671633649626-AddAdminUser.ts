import { MigrationInterface, QueryRunner } from "typeorm"
import * as bcrypt from 'bcrypt'

export class AddAdminUser1671633649626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const password_hash = await bcrypt.hash('iLKj564bqWO0rTn', 10)
        const date = new Date().toISOString()
        await queryRunner.query(`
        INSERT INTO "users" (first_name,last_name,email_address,password_hash,user_role,created_at,has_verified_email,is_super_host)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        `, ["Host", "Admin", "host@clone.com", password_hash, 'host', date, true, true]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE email_address=$1`, ['host@clone.com']);
    }

}
