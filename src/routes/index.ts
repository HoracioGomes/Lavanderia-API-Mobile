import express, { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import PecaRoupaRepository from "../repositories/PecaRoupaRepository";
import CreatePecaRoupaService from "../services/CreatePecaRoupaService";
import PecaRoupaEdicao from "../intefaces/PecaRoupaEdicao";
import PecaRoupa from "../models/PecaRoupa";


const routes = Router();
routes.get('/', (request, response) => {
    return response.json({ message: 'Requisicao funcionado' })
});

routes.get('/roupas', async (request: express.Request, response: express.Response) => {
    try {
        const pecaRoupaRepository = getCustomRepository(PecaRoupaRepository);
        const pecasRoupas = await pecaRoupaRepository.find()
        return response.status(200).json(pecasRoupas);
    } catch (err) {
        return response.status(400).json({ error: err })
    }
})

routes.get('/roupas/data/:data', async (request: express.Request, response: express.Response) => {
    try {
        const pecaRoupaService = new CreatePecaRoupaService();
        const { data } = request.params
        const parseData = parseISO(data)

        const pecasRoupas = await pecaRoupaService.buscarPorData(parseData)
        return response.status(200).json(pecasRoupas);
    } catch (err) {
        return response.status(400).json({ error: err })
    }
})

routes.post('/roupas', async (request: express.Request, response: express.Response) => {
    try {
        const { nome, status, data } = request.body;
        const parseData = parseISO(data)
        const pecaRoupaService = new CreatePecaRoupaService();
        const pecaRoupa = await pecaRoupaService.salvar({ nome, status, data: parseData });
        return response.status(201).json(pecaRoupa);
    } catch (err) {
        return response.status(400).json({ error: err })
    }
});

routes.put('/roupas', async (request: express.Request, response: express.Response) => {
    const pecaRoupaService = new CreatePecaRoupaService();
    const { id, nome, status, data, posicaoNaLista } = request.body;
    const parseData = parseISO(data);
    const pecaRoupaEditada: PecaRoupaEdicao = { id, nome, status, data: parseData, posicaoNaLista };
    const pecaRoupaSalva = await pecaRoupaService.editar(pecaRoupaEditada);

    return response.status(200).json(pecaRoupaSalva);

})

routes.put('/roupas/muda-posicao', async (request: express.Request, response: express.Response) => {
    var pecasRoupasEditadas = Array()
    var pecasRoupas = request.body
    pecasRoupas.forEach(async (element: { id: any; nome: any; status: any; data: any; posicaoNaLista: any }) => {
        const { id, nome, status, data, posicaoNaLista } = element;
        const parseData = parseISO(data)
        const pecaRoupaEditada: PecaRoupaEdicao = { id, nome, status, data: parseData, posicaoNaLista }
        pecasRoupasEditadas.push(pecaRoupaEditada)

    });

    const pecaRoupaRepository = getCustomRepository(PecaRoupaRepository);
    await pecaRoupaRepository.save(pecasRoupasEditadas);
    return response.status(204).send();

})

routes.delete('/roupas/:id', (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    const parseId = Number(id)
    const pecaRoupaRepository = getCustomRepository(PecaRoupaRepository);
    pecaRoupaRepository.delete({
        id: parseId
    })
    return response.status(204).send();

});

export default routes;

