import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnUserIdInPecaRoupa1638915776687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // await queryRunner.dropColumn("nome_tabela", "nome_coluna")

        await queryRunner.addColumn("pecas_roupas", new TableColumn({
            name: "user_id",
            type: "integer",
            isNullable: true
        }));

        await queryRunner.createForeignKey(
            "pecas_roupas",
            new TableForeignKey({
                name: "PecaRoupaUsuario",
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
                onUpdate: "CASCADE"
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("pecas_roupas", "PecaRoupaUsuario");
        await queryRunner.dropColumn("pecas_roupas", "user_id")
    }

}
