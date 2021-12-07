import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import PecaRoupa from "../models/PecaRoupa";
import PecaRoupaRepository from "../repositories/PecaRoupaRepository";
import PecaRoupaCriacao from "../intefaces/PecaRoupaCriacao";
import PecaRoupaEdicao from "../intefaces/PecaRoupaEdicao";

class CreatePecaRoupaService {

    public async buscarPorData(data: Date): Promise<Array<PecaRoupa> | null> {
        const pecaRoupaRepository = getCustomRepository(PecaRoupaRepository);
        const pecaRoupaData = startOfHour(data);
        const findPecaRoupa = await pecaRoupaRepository.findDate(pecaRoupaData);
        return findPecaRoupa

    }

    public async salvar({ nome, status, data }: PecaRoupaCriacao): Promise<PecaRoupa> {
        const pecaRoupaRepository = getCustomRepository(PecaRoupaRepository);
        const pecaRoupa: PecaRoupa = pecaRoupaRepository.create({
            nome: nome,
            status: status,
            data: data,
        });

        await pecaRoupaRepository.save(pecaRoupa)
        return pecaRoupa
    }

    public async editar({ id, nome, status, data, posicaoNaLista }: PecaRoupaEdicao): Promise<PecaRoupa> {
        const pecaRoupaRepository = getCustomRepository(PecaRoupaRepository);
        const pecaRoupa: PecaRoupa = pecaRoupaRepository.create({
            id: id,
            nome: nome,
            status: status,
            data: data,
            posicaoNaLista: posicaoNaLista
        });

        await pecaRoupaRepository.save(pecaRoupa)
        return pecaRoupa
    }


}

export default CreatePecaRoupaService;
