import { MigrationInterface, QueryRunner } from "typeorm";

export class ListingAndAmenities1670427580988 implements MigrationInterface {
    name = 'ListingAndAmenities1670427580988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."listings_region_enum" AS ENUM(
                'asia',
                'africa',
                'north america',
                'south america',
                'europe',
                'australia'
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."listings_listing_type_enum" AS ENUM(
                'house',
                'flat/apartment',
                'tent',
                'farm',
                'guest house',
                'hotel',
                'boat',
                'bed and breakfast',
                'container',
                'dome'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "listings" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "description" character varying(100) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "is_accepting_bookings" boolean NOT NULL DEFAULT false,
                "address" character varying(100) NOT NULL,
                "street" character varying(100) NOT NULL,
                "city" character varying(50) NOT NULL,
                "state" character varying(50) NOT NULL,
                "country" character varying(50) NOT NULL,
                "region" "public"."listings_region_enum" NOT NULL,
                "listing_type" "public"."listings_listing_type_enum" NOT NULL,
                "fully_private_listing" boolean NOT NULL DEFAULT true,
                "min_nights_stay" integer NOT NULL,
                "num_bathrooms" integer NOT NULL,
                "max_num_guests" integer NOT NULL,
                "night_rate" real NOT NULL,
                "time_check_in" TIMESTAMP WITH TIME ZONE NOT NULL,
                "time_check_out" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "amenities" (
                "ownedbyId" integer NOT NULL,
                "allows_pets" boolean NOT NULL DEFAULT false,
                "allows_smoking" boolean NOT NULL DEFAULT false,
                "allows_events" boolean NOT NULL DEFAULT false,
                "has_washing_machine" boolean NOT NULL DEFAULT false,
                "has_tv" boolean NOT NULL DEFAULT false,
                "has_wifi" boolean NOT NULL DEFAULT false,
                "has_workspace" boolean NOT NULL DEFAULT false,
                "has_kitchen" boolean NOT NULL DEFAULT false,
                "has_free_parking" boolean NOT NULL DEFAULT false,
                "has_security_cam" boolean NOT NULL DEFAULT false,
                "has_air_conditioning" boolean NOT NULL DEFAULT false,
                "has_smoke_alarm" boolean NOT NULL DEFAULT false,
                "ownedById" integer,
                CONSTRAINT "REL_40891a0a7a0930cd1be5a28564" UNIQUE ("ownedById"),
                CONSTRAINT "PK_1ccdbf9a738ebe16386e65a5eed" PRIMARY KEY ("ownedbyId")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "amenities"
            ADD CONSTRAINT "FK_40891a0a7a0930cd1be5a28564d" FOREIGN KEY ("ownedById") REFERENCES "listings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "amenities" DROP CONSTRAINT "FK_40891a0a7a0930cd1be5a28564d"
        `);
        await queryRunner.query(`
            DROP TABLE "amenities"
        `);
        await queryRunner.query(`
            DROP TABLE "listings"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."listings_listing_type_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."listings_region_enum"
        `);
    }

}
