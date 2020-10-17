import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createFootholds1602681192645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "footholds",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "owner",
                    type: "varchar",
                },
                {
                    name: "latitude",
                    type: "decimal",
                    scale: 10,
                    precision: 2
                },
                {
                    name: "longitude",
                    type: "decimal",
                    scale: 10,
                    precision: 2
                },

                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "phone",
                    type: "char(14)",
                },
                {
                    name: "whatsapp",
                    type: "boolean",
                },
                {
                    name: "city",
                    type: "varchar",
                },
                {
                    name: "day_max",
                    type: "tinyint",
                },
                {
                    name: "cost",
                    type: "decimal",
                    scale: 2,
                    precision: 6
                },
                {
                    name: "energy",
                    type: "boolean",
                },
                {
                    name: "water",
                    type: "boolean",
                },
                {
                    name: "bathroom",
                    type: "boolean",
                },
                {
                    name: "shower",
                    type: "boolean",
                },
                {
                    name: "extra_info",
                    type: "text",
                },

            ]
            
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('footholds')
    }

}
