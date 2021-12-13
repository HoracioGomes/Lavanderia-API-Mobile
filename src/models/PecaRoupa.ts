import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import Usuario from "./Usuario";

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
    @Column({name: "user_id"})
    userId: number;
    @ManyToOne(() => Usuario)
    @JoinColumn({name: "user_id"})
    usuario: Usuario
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;


}

export default PecaRoupa;
