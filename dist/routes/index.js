"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const PecaRoupaRepository_1 = __importDefault(require("../repositories/PecaRoupaRepository"));
const CreatePecaRoupaService_1 = __importDefault(require("../services/CreatePecaRoupaService"));
const routes = (0, express_1.Router)();
routes.get('/', (request, response) => {
    return response.json({ message: 'Requisicao funcionado' });
});
routes.get('/roupas', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pecaRoupaRepository = (0, typeorm_1.getCustomRepository)(PecaRoupaRepository_1.default);
        const pecasRoupas = yield pecaRoupaRepository.find();
        return response.status(200).json(pecasRoupas);
    }
    catch (err) {
        return response.status(400).json({ error: err });
    }
}));
routes.get('/roupas/data/:data', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pecaRoupaService = new CreatePecaRoupaService_1.default();
        const { data } = request.params;
        const parseData = (0, date_fns_1.parseISO)(data);
        const pecasRoupas = yield pecaRoupaService.buscarPorData(parseData);
        return response.status(200).json(pecasRoupas);
    }
    catch (err) {
        return response.status(400).json({ error: err });
    }
}));
routes.post('/roupas', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, status, data } = request.body;
        const parseData = (0, date_fns_1.parseISO)(data);
        const pecaRoupaService = new CreatePecaRoupaService_1.default();
        const pecaRoupa = yield pecaRoupaService.salvar({ nome, status, data: parseData });
        return response.status(201).json(pecaRoupa);
    }
    catch (err) {
        return response.status(400).json({ error: err });
    }
}));
routes.put('/roupas/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    let parseId = Number(id);
    const { nome, status, data, posicaoNaLista } = request.body;
    const parseData = (0, date_fns_1.parseISO)(data);
    const pecaEditada = {
        id: parseId, nome, status, data: parseData, posicaoNaLista
    };
    const pecaRoupaRepository = (0, typeorm_1.getCustomRepository)(PecaRoupaRepository_1.default);
    const pecaRoupaEditadaSalva = yield pecaRoupaRepository.save(pecaEditada);
    return response.status(200).json(pecaRoupaEditadaSalva);
}));
routes.delete('/roupas/:id', (request, response) => {
    const { id } = request.params;
    const parseId = Number(id);
    const pecaRoupaRepository = (0, typeorm_1.getCustomRepository)(PecaRoupaRepository_1.default);
    pecaRoupaRepository.delete({
        id: parseId
    });
    return response.status(204).send();
});
exports.default = routes;
