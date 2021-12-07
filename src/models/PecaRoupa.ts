import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, IsNull, Generated } from "typeorm";

@Entity("pecas_roupas")
class PecaRoupa{

    @PrimaryGeneratedColumn({type: "integer"})
    id: number;
    @Column()
    nome: string;
    @Column()
    status: string;
    @Column("timestamp with time zone")
    data: Date;
    @Column({type: "integer", name: "posicao_na_lista", generated: true})
    posicaoNaLista: number;


}

export default PecaRoupa;
