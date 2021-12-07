import PecaRoupaCriacao from "../intefaces/PecaRoupaCriacao"

export default function createPecaRoupa({ nome, status, data }: PecaRoupaCriacao) {
    const pecaRoupa = { nome, status, data }
    return pecaRoupa
}
