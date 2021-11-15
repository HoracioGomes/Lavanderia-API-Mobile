const { request, response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const { v4: uuid, validate} = require('uuid');

const roupas = [];

function middlewareValidaId(request, response, next) {
    const { id } = request.params;
    if (!validate(id)) {
        return response.status(400).json({ error: "O id não é válido!" });
    }
    next();
}

app.get('/roupas', (request, response) => {
    const { nome } = request.query
    const filtrados = nome ? roupas.filter(roupa => roupa.nome.includes(nome))
        : roupas;
    return response.json(filtrados);

})

app.post('/roupas', (request, response) => {
    const { nome, cor } = request.body;
    const pecaRoupa = { id: uuid(), nome, cor };
    roupas.push(pecaRoupa);
    return response.json(pecaRoupa);
});

app.put('/roupas/:id', middlewareValidaId,(request, response) => {
    const { id } = request.params;
    const { nome, cor } = request.body;
    const position = roupas.findIndex(roupa => roupa.id == id);
    if (position < 0) {
        return response.status(400).json({ error: "Não encontrado!" });
    };

    const pecaEditada = {
        id,
        nome,
        cor
    };

    roupas[position] = pecaEditada;

    return response.status(200).json(roupas[position]);

})

app.delete('/roupas/:id', (request, response) => {
    const { id } = request.params;
    const position = roupas.findIndex(roupa => roupa.id == id);
    if (position < 0) {
        return response.status(400).json({ error: "Não encontrado!" });
    };
    roupas.splice(position, 1);
    return response.status(204).send();

});


app.listen(3333, () => {
    console.log('Servidor Iniciado! ^_^');
});