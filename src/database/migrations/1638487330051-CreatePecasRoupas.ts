import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePecasRoupas1638487330051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "pecas_roupas",
                columns: [
                    // {
                    //     name: "id",
                    //     type: "varchar",
                    //     isPrimary: true,
                    //     isGenerated: true,
                    //     generationStrategy: "uuid",
                    //     default: "uuid_generate_v4()",
                    // },
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        isNullable: false
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "data",
                        type: "timestamp with time zone",
                        isNullable: false
                    },
                    {
                        name: "posicao_na_lista",
                        type: "integer",
                        isGenerated: true,
                        generationStrategy: "increment",
                        isNullable: false
                    }
                ]

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pecas_roupas");
    }

}
